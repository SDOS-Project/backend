import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsString()
  @IsOptional()
  organisationHandle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  areasOfInterest: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firebaseId: string;

  @ApiProperty()
  @IsString()
  imgUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  socialUrl: string;
}
