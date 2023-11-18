import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty({ enum: Location })
  @IsNotEmpty()
  @IsEnum(Location)
  location: Location;
}
