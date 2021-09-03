/**
 * @import semua modules
 */
import { Request, Response, NextFunction } from 'express'
//import { validationResult } from "express-validator"
import Order from "../models/order.model"


interface ICOrder {
    readAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>//Promise<IOrderLine | null>
    readOne(req: Request, res: Response, next: NextFunction): Promise<Response | void>//Promise<IOrderLine | null>
    create(req: Request, res: Response, next: NextFunction): Promise<Response | void>
    remove(req: Request, res: Response, next: NextFunction): Promise<Response | void>//Promise<IOrderLine | null>
}

export default new class OrderController implements ICOrder {
    async readAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const data = Order.find()
            return await data.then((result) => {
                if (!result) {
                    res.locals.status = 404
                    return next(new Error(`data empty`))
                } else {
                    res.status(200).json(result)
                }
            })
        } catch (err) {
            res.locals.status = 400
            return next(err)
        }
    }
    async readOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const data = Order.findById(req.params.id)
            return await data.then((result) => {
                if (!result) {
                    res.locals.status = 404
                    return next(new Error(`data ${req.params.id} not found`))
                } else {
                    res.status(200).json(result)
                }
            })
        } catch (err) {
            res.locals.status = 400
            return next(err)
        }
    }
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            //expect [{orderline1}, {orderline2}]
            // const errors = validationResult(req)
            // if (errors.isEmpty()) {
            let newOrder = new Order(req.body)
            newOrder.save(err => {
                if (err) {
                    res.locals.status = 400
                    return next(err)
                } else {
                    res.status(200).json({
                        msg: "successfully created"
                    })
                }
            })
            // } else {
            //     throw errors
            // }
        } catch (err) {
            res.locals.status = 400
            return next(err)
        }
    }

    async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            Order.findByIdAndDelete(req.params.id).then(result => {
                if (!result) {
                    res.locals.status = 404
                    return next(new Error(`data ${req.params.id} not found`))
                } else {
                    res.status(200).json({
                        msg: "successfully deleted",
                    })
                }
            })
        } catch (err) {
            res.locals.status = 400
            return next(err)
        }
    }

}