import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class StudentSignupDto {
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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firebaseId: string;

  @ApiProperty()
  @IsString()
  imgUrl: string;
}
