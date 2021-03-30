const express = require('express');
const bodyParser = require('body-parser');


const Favorites = require('../models/favorite');
var authenticate = require('../authenticate');
const { populate } = require('../models/favorite');

const favRouter = express.Router();

favRouter.use(bodyParser.json());

favRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id }).populate('user').exec((err, fav) => {

            if (err) {
                return next(err);
            }
            else if (fav != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(fav);
            }
            else {
                res.end("no favorites")
            }
        })


    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id }, (err, fav) => {
            if (err) {
                return next(err)
            }
            else if (fav != null) {
                fav.dishes.push(req.body)
                fav.save()
                    .then((fav) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);
                    })
            }
            else {
                favo = {
                    user: req.user._id,
                    dishes: [req.body]
                }
                Favorites.create(favo)
                    .then((fav) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);
                    })
            }
        })

    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('get operation not supported on /favourite/');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOneAndRemove({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
favRouter.route('/:dishId')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('get operation not supported on /favourite/' + req.params.dishId);
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id }, (err, fav) => {
            if (err) {
                return next(err)
            }
            else if (fav != null) {
                fav.dishes.push(req.params.dishId)
                fav.save()
                    .then((fav) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);
                    })
                    .catch((err) => next(err))
            }
            else {
                favo = {
                    user: req.user._id,
                    dishes: [req.params.dishId]
                }
                Favorites.create(favo)
                    .then((fav) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);
                    })
            }

        })

    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOneAndUpdate({ user: req.user._id }, { $pull: { dishes: req.params.dishId } }, (err, fav) => {
            if (err) {
                return next(err)
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(fav);
        })
    })

module.exports = favRouter;