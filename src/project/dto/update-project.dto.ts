import { ApiProperty } from '@nestjs/swagger';
import { Location, ProjectStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsString } from 'class-validator';

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
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: Location })
  @IsEnum(Location)
  location: Location;
}
