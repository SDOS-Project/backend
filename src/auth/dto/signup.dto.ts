import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { areasOfInterest } from 'src/types/areasOfInterests';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organisationHandle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  // @IsIn(areasOfInterest)
  areasOfInterest: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firebaseId: string;
}
