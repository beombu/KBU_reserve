const { Router } = require("express");
const teamRouter = Router();
const Teams = require("../models/Teams");
const mongoose = require("mongoose");

teamRouter.post("/",async(req,res)=>{
    try{
        if(req.body.selectedSports ==="풋살장" && req.body.parseNumberPeople > 8)
        throw new Error("풋살장엔 8명까지만 들어갈수있어요!")
        if(req.body.selectedSports ==="농구장" && req.body.parseNumberPeople > 10)
        throw new Error("농구장엔 10명까지만 들어갈수있어요!")
        if(req.body.selectedSports ==="탁구장" && req.body.parseNumberPeople > 4)
        throw new Error("탁구장엔 4명까지만 들어갈수있어요!")
        await new Teams({
            writer : req.body._id,
            name: req.body.name,
            major: req.body.selectedMajor,
            sport : req.body.selectedSports,
            sex : req.body.selectedSex,
            phoneNumber : req.body.phoneNumber,
            say : req.body.say,
            parseNumberPeople :req.body.parseNumberPeople,
            countNumberPeople : 0
        }).save();
        res.json({message: "Team make success"})
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/getBoardList", async (req,res) => {
    try{
        const _id = req.body._id;
        const board = await Teams.find({writer:_id},null,{
            sort:{createAt:-1}
        });
        res.json({board});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

module.exports = {teamRouter};