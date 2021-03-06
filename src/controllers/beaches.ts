/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import logger from '@src/logger';
import { authMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
import Mongoose from 'mongoose';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach({...req.body, ...{user: req.decoded?.id}});
      const result = await beach.save();
      res.status(201).send(result);
    } catch(error: any) {
      logger.error(error);
      if(error instanceof Mongoose.Error.ValidationError){
        res.status(422).send({ error: error.message })
      }else {
        res.status(500).send({ error: 'Internal server error' })
      }
    }
  }
}