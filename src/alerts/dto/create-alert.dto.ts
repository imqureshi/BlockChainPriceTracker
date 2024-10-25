import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TokenList } from 'src/config';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email you want to send the alert to',
    example: 'example@email.com',
  })
  email: string;

  @IsNotEmpty()
  @IsEnum(TokenList)
  @ApiProperty({
    description: 'the coin you want to put the alert on add the symbol here',
    enum: TokenList,
    example: 'ETH',
  })
  chain: TokenList;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'the dollar value you want to send the threshold on',
    example: 10,
  })
  dollar: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the alert',
    example: 'Alert on high eth',
  })
  name: string;
}
