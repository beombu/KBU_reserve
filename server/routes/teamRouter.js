const { Router } = require("express");
const teamRouter = Router();
const Teams = require("../models/Teams");
const User = require("../models/User");
const mongoose = require("mongoose");

teamRouter.post("/",async(req,res)=>{
    try{
        if(req.body.selectedSports ==="풋살장" && req.body.parseNumberPeople > 8)
        throw new Error("풋살장엔 8명까지만 들어갈수있어요!")
        if(req.body.selectedSports ==="농구장" && req.body.parseNumberPeople > 10)
        throw new Error("농구장엔 10명까지만 들어갈수있어요!")
        if(req.body.selectedSports ==="탁구장" && req.body.parseNumberPeople > 4)
        throw new Error("탁구장엔 4명까지만 들어갈수있어요!")

        const user = await User.findOne({_id:req.body._id});
        const Team = await new Teams({
        
            writer : req.body._id,
            teamName: req.body.teamName,
            sport : req.body.selectedSports,
            phoneNumber : req.body.phoneNumber,
            wantPlayTime: req.body.wantPlayTime,
            wantPlayDate : req.body.wantPlayDate,
            teamPw : req.body.teamPw,
            say : req.body.say,
            maxNumberPeople :req.body.maxNumberPeople,
            countNumberPeople : 1,
            members : [
                {
                    name : user.name,
                    email : user.email,
                    phoneNumber : user.phoneNumber,
                    sex : user.sex,
                    major : user.major,
                }
            ]
        }).save();
        res.json({message: "Team make success"})
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/getBoardList", async (req,res) => {
    try{
        const sessionId = req.body.sessionId;//localStorage의 sessionId값
        const user_sessionId = await User.findOne({ "sessions._id": [sessionId] });
        const _id = user_sessionId._id;
        const board = await Teams.find({writer:{_id}},null,{
            sort:{createAt:-1}
        });
        res.json({board});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/delete",async(req,res) =>{
    try{
        await Teams.remove({
            _id:req.body._id
        });
        res.json({message: true});
    } catch (err) {
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/getMakeTeam",async(req,res) =>{
    try{
        const _id = req.body._id;
        const board = await Teams.findOne({_id:_id});
        res.json({board});
    } catch (err) {
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/update",async(req,res)=>{
    try{
        await Teams.findByIdAndUpdate(
            req.body._id,
            {
                $set:{
                    teamName: req.body.teamName,
                    sport : req.body.selectedSports,
                    phoneNumber : req.body.phoneNumber,
                    wantPlayTime: req.body.wantPlayTime,
                    teamPw : req.body.teamPw,
                    say : req.body.say,
                    maxNumberPeople :req.body.maxNumberPeople,
                }
            }
        ).exec();
        res.json({message:"수정이 완료되었습니다!"});
    } catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

module.exports = {teamRouter};