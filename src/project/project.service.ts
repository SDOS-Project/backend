import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import generateRandomAlphanumericWithLength from '../auth/utils';
import { AddUpdateDto } from './dto/add-update.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      const creator = await this.prisma.user.findUnique({
        where: {
          handle: createProjectDto.creatorHandle,
        },
      });
      if (!creator)
        throw new HttpException('Creator not found', HttpStatus.NOT_FOUND);
      const partner = await this.prisma.user.findUnique({
        where: {
          handle: createProjectDto.partnerHandle,
        },
      });
      if (!partner)
        throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
      if (creator.handle === partner.handle) {
        throw new HttpException(
          'Creator and partner cannot be the same',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (creator.organisationId === partner.organisationId) {
        throw new HttpException(
          'Creator and partner cannot be from the same organisation',
          HttpStatus.BAD_REQUEST,
        );
      }
      const project = await this.prisma.project.create({
        data: {
          name: createProjectDto.name,
          description: createProjectDto.description,
          handle:
            createProjectDto.name.split(' ').join('-').toLowerCase() +
            '-' +
            generateRandomAlphanumericWithLength(5),
          startDate: createProjectDto.startDate,
          endDate: createProjectDto.endDate,
          location: createProjectDto.location,
          students: JSON.stringify(createProjectDto.students),
          users: {
            connect: [
              {
                id: creator.id,
              },
              {
                id: partner.id,
              },
            ],
          },
          organisations: {
            connect: [
              {
                id: creator.organisationId,
              },
              {
                id: partner.organisationId,
              },
            ],
          },
        },
      });
      return { handle: project.handle };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.prisma.project.findMany({
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
              imgUrl: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(handle: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        handle,
      },
      select: {
        name: true,
        description: true,
        handle: true,
        status: true,
        startDate: true,
        endDate: true,
        location: true,
        students: true,
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
            imgUrl: true,
          },
        },
      },
    });
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    return project;
  }

  async findUpdates(handle: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        handle,
      },
      select: {
        updates: {
          select: {
            content: true,
            createdAt: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                imgUrl: true,
                handle: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    return project.updates;
  }

  async findConfig(firebaseId: string, handle: string) {
    const isAdmin = await this.checkIfUserIsAdmin(firebaseId, handle);
    return { isAdmin };
  }

  async update(
    firebaseId: string,
    handle: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    const isAdmin = await this.checkIfUserIsAdmin(firebaseId, handle);
    if (!isAdmin)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    try {
      const project = await this.prisma.project.update({
        where: {
          handle,
        },
        data: updateProjectDto,
        select: {
          name: true,
          description: true,
          handle: true,
          status: true,
          startDate: true,
          endDate: true,
          location: true,
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
              imgUrl: true,
            },
          },
        },
      });
      return project;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUpdate(
    firebaseId: string,
    handle: string,
    addUpdateDto: AddUpdateDto,
  ) {
    const isAdmin = await this.checkIfUserIsAdmin(firebaseId, handle);
    if (!isAdmin)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    try {
      return await this.prisma.update.create({
        data: {
          content: addUpdateDto.content,
          user: {
            connect: {
              handle: addUpdateDto.userHandle,
            },
          },
          project: {
            connect: {
              handle,
            },
          },
        },
        select: {
          content: true,
          createdAt: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              handle: true,
              imgUrl: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkIfUserIsAdmin(firebaseId: string, handle: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        handle,
      },
      select: {
        users: {
          select: {
            firebaseId: true,
          },
        },
      },
    });
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    return project.users.some((user) => user.firebaseId === firebaseId)
      ? true
      : false;
  }
}
