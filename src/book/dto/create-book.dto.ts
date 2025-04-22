import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  user: number;
}
