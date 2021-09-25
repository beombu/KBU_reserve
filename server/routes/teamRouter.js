const { Router } = require("express");
const teamRouter = Router();
const Teams = require("../models/Teams");
const mongoose = require("mongoose");

teamRouter.post("/",async(req,res)=>{
    try{
        console.log(req.body);
        if(req.body.selectedSports ==="풋살장" && req.body.parseNumberPeople > 8)
        throw new Error("풋살장엔 8명까지만 들어갈수있어요!")
        if(req.body.selectedSports ==="농구장" && req.body.parseNumberPeople > 10)
        throw new Error("농구장엔 10명까지만 들어갈수있어요!")
        if(req.body.selectedSports ==="탁구장" && req.body.parseNumberPeople > 4)
        throw new Error("탁구장엔 4명까지만 들어갈수있어요!")
        await new Teams({
            writer : req.body._id,
            teamName: req.body.teamName,
            sport : req.body.selectedSports,
            phoneNumber : req.body.phoneNumber,
            wantPlayTime: req.body.wantPlayTime,
            teamPw : req.body.teamPw,
            say : req.body.say,
            maxNumberPeople :req.body.maxNumberPeople,
            countNumberPeople : 1
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
        await Teams.findOneAndUpdate(
            {_id:req.body._id},
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
        ).save();
        res.json({message:"수정이 완료되었습니다!"});
    } catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

module.exports = {teamRouter};