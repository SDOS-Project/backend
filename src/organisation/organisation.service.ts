import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganisationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.organisation.findMany();
  }

  findOne(handle: string) {
    const organisation = this.prisma.organisation.findUnique({
      where: {
        handle,
      },
    });
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation;
  }

  findUsers(handle: string) {
    const organisation = this.prisma.organisation.findUnique({
      where: {
        handle,
      },
      select: {
        users: {
          select: {
            handle: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation.users;
  }

  findProjects(handle: string) {
    const organisation = this.prisma.organisation.findUnique({
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
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation.users;
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
