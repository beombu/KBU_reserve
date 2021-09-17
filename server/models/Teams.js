const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
    {
        name: {type:String, required: true},
        major :{ type: String, required: true},
        sport :{ type:String, required:true},
        sex : {type:String, required:true},
        phoneNumber : {type:String, required:true, unique: true},
        say : {type:String, required:true},
        parseNumberPeople : {type:Number, required: true},
        countNumberPeople : {type:Number},
    },
    {timestamps:true}
);

module.exports = mongoose.model("team", TeamSchema);