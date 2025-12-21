import { NextFunction, Request, Response } from "express";
import CatchAsync from "../../Utils/CatchAsync";
import sendResponse from "../../Utils/SendResponse";

export const checkProfileCompletion = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;

      next();
    } catch (error) {
      next(error);
    }
  },
);
