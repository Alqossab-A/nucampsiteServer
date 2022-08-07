const express = require('express');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

const promotionsRouter = express.Router();

promotionsRouter
    .route('/')
    .get((req, res, next) => {
        Promotion.find()
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, (req, res) => {
        Promotion.create(req.body)
            .then((promotion) => {
                console.log('Promotion Created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => next(err));
    })

    .put(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('PUT opertation not supported on /promotion');
    })

    .delete(authenticate.verifyUser, (req, res) => {
        Promotion.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

promotionsRouter
    .route('/:promotionId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, (req, res) => {
        res.status = 403;
        res.end(
            `POST operation not supported on /partner/${req.params.promotionId}`
        );
    })

    .put(authenticate.verifyUser, (req, res) => {
        Promotion.findByIdAndUpdate(
            req.params.promotionId,
            {
                $set: req.body,
            },
            { new: true }
        )
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            })
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotion.findByIdAndDelete(req.params.promotionId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = promotionsRouter;
