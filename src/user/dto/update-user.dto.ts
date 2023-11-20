import { ApiProperty } from '@nestjs/swagger';
import { Discipline } from '@prisma/client';
import { ArrayMinSize, IsArray, IsEnum, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ enum: Discipline })
  @IsEnum(Discipline)
  discipline: Discipline;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  areasOfInterest: string[];
}
