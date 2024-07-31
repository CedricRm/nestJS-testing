import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let responseMock: Partial<Response>;

  beforeEach(async () => {
    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  // Useful for debugging
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * GET PAYMENTS
   */
  describe('getPayments', () => {
    it('should return a status of 400 if count or page is missing', () => {
      controller.getPayments(null, null, responseMock as Response);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });

    it('should return a status of 200 when count or page are present', () => {
      controller.getPayments('100', '1', responseMock as Response);
      expect(responseMock.status).toHaveBeenCalledWith(200);
    });
  });
});
