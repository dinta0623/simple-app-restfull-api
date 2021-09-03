/**
 * @import semua modules
 */
import { Request, Response, NextFunction } from 'express'
//import { validationResult } from "express-validator"
import Cart from "../models/cart.model"


interface ICOrderLine {
    readAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>//Promise<IOrderLine | null>
    readBy(req: Request, res: Response, next: NextFunction): Promise<Response | void>
    create(req: Request, res: Response, next: NextFunction): Promise<Response | void>
    remove(req: Request, res: Response, next: NextFunction): Promise<Response | void>//Promise<IOrderLine | null>
}

export default new class OrderLineController implements ICOrderLine {

    async readAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const data = Cart.find()
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
    async readBy(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const data = Cart.findOne({
                order_id: req.params.cartdi
            })
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
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            //expect [{orderline1}, {orderline2}]
            //const errors = validationResult(req)
            // if (errors.isEmpty()) {
            let newOrderLine = new Cart(req.body)
            newOrderLine.save(err => {
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
            Cart.deleteOne({ _id: req.params.id }).then(result => {
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