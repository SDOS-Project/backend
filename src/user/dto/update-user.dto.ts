import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  areasOfInterest: string[];
}
