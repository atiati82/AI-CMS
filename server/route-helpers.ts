import type { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function asyncHandler(fn: AsyncHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function handleZodError(error: unknown, res: Response, fallbackMessage: string): Response {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: fromZodError(error).toString() });
  }
  console.error(fallbackMessage, error);
  return res.status(500).json({ error: fallbackMessage });
}

export function createCrudHandler<T>(
  schema: z.ZodSchema<T>,
  createFn: (data: T) => Promise<any>,
  errorMessage: string
): AsyncHandler {
  return async (req, res) => {
    try {
      const validated = schema.parse(req.body);
      const result = await createFn(validated);
      res.json(result);
    } catch (error) {
      handleZodError(error, res, errorMessage);
    }
  };
}

export function createUpdateHandler<T>(
  updateFn: (id: string, data: any) => Promise<any>,
  notFoundMessage: string,
  errorMessage: string
): AsyncHandler {
  return async (req, res) => {
    try {
      const result = await updateFn(req.params.id, req.body);
      if (!result) {
        return res.status(404).json({ error: notFoundMessage });
      }
      res.json(result);
    } catch (error) {
      handleZodError(error, res, errorMessage);
    }
  };
}

export function createDeleteHandler(
  deleteFn: (id: string) => Promise<void>,
  notFoundMessage: string,
  errorMessage: string
): AsyncHandler {
  return async (req, res) => {
    try {
      await deleteFn(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error(errorMessage, error);
      res.status(500).json({ error: errorMessage });
    }
  };
}

export function createGetByIdHandler(
  getFn: (id: string) => Promise<any>,
  notFoundMessage: string,
  errorMessage: string
): AsyncHandler {
  return async (req, res) => {
    try {
      const result = await getFn(req.params.id);
      if (!result) {
        return res.status(404).json({ error: notFoundMessage });
      }
      res.json(result);
    } catch (error) {
      console.error(errorMessage, error);
      res.status(500).json({ error: errorMessage });
    }
  };
}

export function createGetAllHandler(
  getAllFn: () => Promise<any[]>,
  errorMessage: string
): AsyncHandler {
  return async (req, res) => {
    try {
      const results = await getAllFn();
      res.json(results);
    } catch (error) {
      console.error(errorMessage, error);
      res.status(500).json({ error: errorMessage });
    }
  };
}
