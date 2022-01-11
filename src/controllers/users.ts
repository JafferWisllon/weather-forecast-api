/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post } from '@overnightjs/core';
import { User } from '@src/models/user';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async getForecastForLoggedUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save()
      res.status(201).send(newUser); 
    }catch(error: any) {
      this.sendCreatedUpdateErrorResponse(res, error)
    }
  }
}
