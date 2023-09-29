import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import generateRandomAlphanumericWithLength from 'src/auth/utils';

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
      const partner = await this.prisma.user.findUnique({
        where: {
          handle: createProjectDto.partnerHandle,
        },
      });
      if (!partner)
        throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
      const project = await this.prisma.project.create({
        data: {
          name: createProjectDto.name,
          description: createProjectDto.description,
          handle:
            createProjectDto.name.split(' ').join('-').toLowerCase() +
            '-' +
            generateRandomAlphanumericWithLength(5),
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
      return await this.prisma.project.findMany();
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
          },
        },
      },
    });
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    return project;
  }

  async getUpdates(handle: string) {
    const updates = await this.prisma.project.findUnique({
      where: {
        handle,
      },
      select: {
        updates: true,
      },
    });
    if (!updates)
      throw new HttpException('Updates not found', HttpStatus.NOT_FOUND);
    return updates;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
