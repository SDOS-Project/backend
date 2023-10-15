import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return `This action returns all user`;
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
        organisation: {
          select: {
            name: true,
            handle: true,
            type: true,
          },
        },
      },
    });
  }

  async findFaculty() {
    console.log('getFaculty');
    try {
      const faculty = await this.prisma.user.findMany({
        where: {
          role: UserRole.FACULTY,
        },
      });
      console.log(faculty);
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
        organisation: {
          select: {
            name: true,
            handle: true,
            type: true,
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
              },
            },
            organisations: {
              select: {
                name: true,
                handle: true,
                type: true,
                logoUrl: true,
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
        email: true,
        role: true,
        handle: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
