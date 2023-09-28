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

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
