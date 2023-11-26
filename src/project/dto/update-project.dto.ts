import { ApiProperty } from '@nestjs/swagger';
import { Location, ProjectStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StudentDto } from './student.dto';
import { Type } from 'class-transformer';

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
  @IsOptional()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate: string;

  @ApiProperty({ enum: Location })
  @IsOptional()
  @IsEnum(Location)
  @IsOptional()
  location: Location;

  @ApiProperty({ type: [StudentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students: StudentDto[];
}
