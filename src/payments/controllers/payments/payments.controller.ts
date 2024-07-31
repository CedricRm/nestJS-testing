import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Get()
  getPayments(
    @Query('count') count: string,
    @Query('page') page: string,
    @Res() response: Response,
  ) {
    if (!count || !page) {
      response
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: 'Missing count or page query parameter' });
    }

    response.status(HttpStatus.OK);
  }
}
