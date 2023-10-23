import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganisationService {
  constructor(private prisma: PrismaService) {}

  async findAll(firebaseId: string) {
    return await this.prisma.organisation.findMany({
      where: { firebaseId: { not: firebaseId } },
      select: {
        name: true,
        email: true,
        handle: true,
        type: true,
        imgUrl: true,
        address: true,
      },
    });
  }

  async findDropdown() {
    return await this.prisma.organisation.findMany({
      select: {
        name: true,
        handle: true,
      },
    });
  }

  async findOne(handle: string) {
    const organisation = await this.prisma.organisation.findUnique({
      where: {
        handle,
      },
      select: {
        name: true,
        email: true,
        handle: true,
        type: true,
        imgUrl: true,
        address: true,
        ipPolicy: true,
      },
    });
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation;
  }

  async findUsers(handle: string) {
    const organisation = await this.prisma.organisation.findUnique({
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
            imgUrl: true,
          },
        },
      },
    });
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation.users;
  }

  async findProjects(handle: string) {
    const organisation = await this.prisma.organisation.findUnique({
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
                imgUrl: true,
              },
            },
          },
        },
      },
    });
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation.projects;
  }

  async update(
    firebaseId: string,
    updateOrganisationDto: UpdateOrganisationDto,
  ) {
    const organisation = await this.prisma.organisation.update({
      where: {
        firebaseId,
      },
      data: updateOrganisationDto,
      select: {
        name: true,
        email: true,
        handle: true,
        type: true,
        imgUrl: true,
        address: true,
        ipPolicy: true,
      },
    });
    if (!organisation) {
      throw new HttpException('Organisation not found', HttpStatus.NOT_FOUND);
    }
    return organisation;
  }
}
