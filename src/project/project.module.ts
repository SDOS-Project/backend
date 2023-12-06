import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from 'src/emai.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, EmailService],
  imports: [PrismaModule],
})
export class ProjectModule {}
