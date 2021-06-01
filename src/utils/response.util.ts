import { Response } from "express";

export const response = (res: Response) => {
  return {
    success: (payload: object) =>
      res.json({
        isError: false,
        payload,
      }),
    error: (errorCode: number, payload: object) =>
      res.status(errorCode).json({
        isError: true,
        payload,
      }),
  };
};
