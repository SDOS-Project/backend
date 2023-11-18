import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creatorHandle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partnerHandle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: Location })
  @IsNotEmpty()
  @IsEnum(Location)
  location: Location;
}
