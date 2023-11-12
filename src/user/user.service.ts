import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  private firebaseAdmin: admin.app.App;
  constructor(private prisma: PrismaService) {
    this.firebaseAdmin = admin.app();
  }

  async findRecommendations(firebaseId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseId,
      },
      select: {
        id: true,
        areasOfInterest: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.user.findMany({
      where: {
        id: { not: user.id },
        areasOfInterest: {
          hasSome: user.areasOfInterest,
        },
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        handle: true,
        role: true,
        areasOfInterest: true,
        imgUrl: true,
        organisation: {
          select: {
            name: true,
            handle: true,
            type: true,
            imgUrl: true,
          },
        },
      },
    });
  }

  async findFaculty() {
    try {
      const faculty = await this.prisma.user.findMany({
        where: {
          role: UserRole.FACULTY,
        },
      });
      return faculty;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findEmployees() {
    try {
      const employees = await this.prisma.user.findMany({
        where: {
          role: UserRole.EMPLOYEE,
        },
      });
      return employees;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(handle: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        handle,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        handle: true,
        role: true,
        areasOfInterest: true,
        imgUrl: true,
        organisation: {
          select: {
            name: true,
            handle: true,
            type: true,
            imgUrl: true,
          },
        },
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findProjects(handle: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        handle,
      },
      select: {
        projects: {
          select: {
            name: true,
            description: true,
            handle: true,
            status: true,
            users: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                handle: true,
                role: true,
                imgUrl: true,
              },
            },
            organisations: {
              select: {
                name: true,
                handle: true,
                type: true,
                imgUrl: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.projects;
  }

  async update(firebaseId: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.user.update({
      where: {
        firebaseId,
      },
      data: updateUserDto,
      select: {
        firstName: true,
        lastName: true,
        areasOfInterest: true,
        handle: true,
      },
    });
  }

  async remove(firebaseId: string, handle: string) {
    try {
      await this.prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            handle,
          },
          select: {
            id: true,
            firebaseId: true,
            organisation: {
              select: {
                firebaseId: true,
              },
            },
          },
        });

        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (user.organisation.firebaseId !== firebaseId) {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const id = user.id;
        await transaction.organisation.update({
          where: {
            firebaseId,
          },
          data: {
            users: {
              delete: {
                id,
              },
            },
          },
        });

        await transaction.update.deleteMany({
          where: {
            userId: id,
            user: {
              handle,
            },
          },
        });

        await transaction.project.deleteMany({
          where: {
            users: {
              some: {
                handle,
                id,
              },
            },
          },
        });

        await transaction.user.delete({
          where: {
            handle,
          },
        });

        await this.firebaseAdmin.auth().deleteUser(user.firebaseId);
      });

      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
