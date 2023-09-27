import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OrganisationController],
  providers: [OrganisationService],
  imports: [PrismaModule],
})
export class OrganisationModule {}
