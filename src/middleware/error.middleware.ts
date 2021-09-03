import { Request, Response, NextFunction } from "express"

// interface IError extends Error {
//     status: number
// }

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(res.locals.status || 500).json({
        status: res.locals.status,
        msg: err.message,
        detail: { ...err }
    })
}