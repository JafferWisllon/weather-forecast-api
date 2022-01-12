import { CUSTOM_VALIDATION } from "@src/models/user";
import { Response } from "express";
import mongoose from "mongoose";

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(res: Response, error: mongoose.Error.ValidationError | Error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientError = this.handleClientErros(error)
      console.log(clientError)
      res.status(clientError.code).send({ code: clientError.code, error: clientError.error })
    } else {
      res.status(500).send({ code: 500, error: 'Something went wrong!' })
    }
  }

  private handleClientErros(error: mongoose.Error.ValidationError): {code: number, error: string} {
    const duplicatedKindErrors = Object.values(error.errors).filter((err) => {
      if (
        err instanceof mongoose.Error.ValidatorError ||
        err instanceof mongoose.Error.CastError
      ) {
        return err.kind === CUSTOM_VALIDATION.DUPLICATED;
      } else {
        return null;
      }
    });

    if(duplicatedKindErrors.length > 0) {
      return { code: 409, error: error.message }  
    } else {
      return { code: 422, error: error.message }
    }
  }
}