import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import generateRandomAlphanumericWithLength from 'src/auth/utils';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  create(createProjectDto: CreateProjectDto) {
    try {
      const project = this.prisma.project.create({
        data: {
          name: createProjectDto.name,
          description: createProjectDto.description,
          handle:
            createProjectDto.name.toLowerCase().replace(' ', '-') +
            generateRandomAlphanumericWithLength(5),
          users: {
            connect: createProjectDto.userHandles.map((userHandle) => ({
              handle: userHandle,
            })),
          },
          organisations: {
            connect: createProjectDto.organisationHandles.map(
              (organisationHandle) => ({
                handle: organisationHandle,
              }),
            ),
          },
        },
      });
      return project;
    } catch (error) {}
    return 'This action adds a new project';
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
