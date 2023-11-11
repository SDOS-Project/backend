import { ApiProperty } from '@nestjs/swagger';
import { OrganisationType } from '@prisma/client';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class OrganisationSignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: OrganisationType;

  @ApiProperty()
  @IsString()
  imgUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  ipPolicy: string;

  @IsNotEmpty()
  @IsString()
  firebaseId: string;
}
