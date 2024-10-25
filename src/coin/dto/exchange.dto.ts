import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExchangeDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'The number of eth coins you want to swap',
    minimum: 1,
  })
  noOfCoins: number;
}
