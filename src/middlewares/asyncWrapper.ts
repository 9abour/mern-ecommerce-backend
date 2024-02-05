import { Request, Response, NextFunction } from "express";

/**
 * Wraps an asynchronous function to handle errors and pass them to the Express error handling middleware.
 *
 * @template T - The type of the value returned by the asynchronous function.
 * @param {function(req: Request, res: Response, next: NextFunction): Promise<T>} asyncFC - The asynchronous function to be wrapped.
 * @returns {function(req: Request, res: Response, next: NextFunction): void} - The middleware function with error handling.
 */
const asyncWrapper = <T>(
  asyncFC: (req: Request, res: Response, next: NextFunction) => Promise<T>,
) => {
  /**
   * Middleware function that wraps the execution of the asynchronous function and handles errors.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function for passing control to the next middleware.
   * @returns {void}
   */
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFC(req, res, next).catch((error) => {
      next(error);
    });
  };
};

export default asyncWrapper;
