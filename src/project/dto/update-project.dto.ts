import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

class UpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}

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

  @ApiProperty()
  @Type(() => UpdateDto)
  update: UpdateDto;
}
