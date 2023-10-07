import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
