import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userHandle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
