/**
 * @import semua modules
 */
import { Request, Response, NextFunction } from 'express'
//import { validationResult } from "express-validator"
import Product from "../models/product.model"


interface ICProduct {
  readOne(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  readAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  update(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  delete(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}

export default new class ProductController implements ICProduct {
  async readAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const data = Product.find()
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
      await Product.findById(req.params.id).then(result => {
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
      // const errors = validationResult(req)
      // if (errors.isEmpty()) {
      const newUser = new Product({
        ...req.body
      })
      newUser.save(err => {
        if (err) {
          res.locals.status = 400
          return next(err)
        } else {
          return res.status(200).json({
            msg: "successfully created"
          })
        }
      })
      // } else {
      //   throw errors
      // }
    } catch (err) {
      res.locals.status = 400
      return next(err)
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // search for data first
      const olddata = await Product.findById(req.params.id)
      if (!olddata?.$isEmpty) {
        res.locals.status = 404
        return next(new Error(`data ${req.params.id} not found`))
      } else {
        olddata.updateOne({
          olddata, ...req.body
        })
          .then(result => {
            res.status(200).json({
              msg: "successfully updated",
              result
            })
          })
      }
    } catch (err) {
      res.locals.status = 400
      return next(err)
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      Product.findByIdAndDelete(req.params.id).then(result => {
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