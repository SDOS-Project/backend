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

  findAll() {
    return `This action returns all project`;
  }

  findOne(handle: string) {
    const project = this.prisma.project.findUnique({
      where: {
        handle,
      },
    });

    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
