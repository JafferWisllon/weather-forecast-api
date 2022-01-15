/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { authMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(req: Request, res: Response): Promise<void> {
    try {
      const beachs = await Beach.find({user: req.decoded?.id});
      const forecastData = await forecast.processForecastForBeaches(beachs);
      res.status(200).send(forecastData);
    } catch(err: any) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
}
