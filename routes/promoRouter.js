const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions= require('../models/promotions');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res)=>{
    Promotions.create(req.body)
    .then((promos)=>{
        console.log('Promotion added',promos)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
promoRouter.route('/:promoid')
.get((req,res,next) => {
    Promotions.findById(req.params.promoid)
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoid);
})
.post((req,res)=>{
    Promotions.create(req.body)
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoid,{
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoid)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = promoRouter;