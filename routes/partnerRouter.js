const express = require('express');
const Partner = require('../models/partners');
const authenticate = require('../authenticate');
const cors = require('./cors');

const partnerRouter = express.Router();

partnerRouter
    .route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

    .get(cors.cors, (req, res, next) => {
        Partner.find()
            .then((partners) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partners);
            })
            .catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        Partner.create(req.body)
            .then((partner) => {
                console.log('Partner Created', partner);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch((err) => next(err));
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('PUT opertation not supported on /partner');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        Partner.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

partnerRouter
    .route('/:partnersId')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

    .get(cors.cors, (req, res, next) => {
        Partner.findById(req.params.partnersId)
            .then((partner) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.status = 403;
        res.end(
            `POST operation not supported on /partner/${req.params.partnersId}`
        );
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        Partner.findByIdAndUpdate(
            req.params.partnersId,
            {
                $set: req.body,
            },
            { new: true }
        )
            .then((partner) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Partner.findByIdAndDelete(req.params.partnersId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch((err) => next(err));
    });

module.exports = partnerRouter;
