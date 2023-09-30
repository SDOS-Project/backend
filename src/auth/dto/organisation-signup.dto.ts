import { ApiProperty } from '@nestjs/swagger';
import { OrganisationType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

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
  // @IsNotEmpty()
  @IsString()
  logoUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ipPolicy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firebaseId: string;
}
