const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var pormoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:""
    },
    price:{
        type: Currency,
        required: true,
        min: 0
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
        required:true
    }

   
});

var Promotions = mongoose.model('Promo',pormoSchema);
module.exports = Promotions;