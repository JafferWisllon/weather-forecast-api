import { Controller, Get } from '@overnightjs/core';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';

const forecast = new Forecast();

@Controller('forecast')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response): Promise<void> {
   const beachs = await Beach.find({});
   const forecastData = await forecast.processForecastForBeaches(beachs);
   res.status(200).send(forecastData);
  }
}
