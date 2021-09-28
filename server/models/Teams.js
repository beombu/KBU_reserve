const mongoose = require("mongoose");

const {
    Types: {ObjectId}
} = mongoose.Schema;

const TeamSchema = new mongoose.Schema(
    {
        writer : {
            type : ObjectId,
            required: true,
            ref: "User"
        },
        teamName: {type:String, required: true},
        sport :{ type:String, required:true},
        phoneNumber : {type:String, required:true, unique: true},
        wantPlayTime : {type:Array, required:true},
        teamPw : {type:String, required:false},
        say : {type:String, required:true},
        maxNumberPeople : {type:Number, required: true},
        countNumberPeople : {type:Number},
        members : {type:Array, required: true},
        createdAt:{
            type: Date,
            default: Date.now
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("team", TeamSchema);