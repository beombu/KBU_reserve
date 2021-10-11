const { Router } = require("express");
const teamRouter = Router();
const Teams = require("../models/Teams");
const User = require("../models/User");
const mongoose = require("mongoose");

teamRouter.post("/",async(req,res)=>{
    try{
        if(req.body.teamName==="") throw new Error("팀이름을 적으세요!!");
        if(req.body.teamName.length >= 10) throw new Error("팀이름의 길이가 길어요ㅠㅠ..");
        if(req.body.selectedSports ==="스포츠선택") throw new Error("스포츠를 선택하세요!");
        if(req.body.maxNumberPeople < 2) throw new Error("혼자할거야....???? 안돼!!!!!");
        if(req.body.wantPlayTime.length===0) throw new Error("시간을 골라주세요!");
        if(req.body.say==="") throw new Error("모집문장을 적으세요!!");
        if(req.body.selectedSports === "풋살" && req.body.maxNumberPeople > 8) throw new Error("풋살은 최대 8명까지만 이용가능!");
        if(req.body.selectedSports === "농구" && req.body.maxNumberPeople > 10) throw new Error("농구은 최대 10명까지만 이용가능!");
        if(req.body.selectedSports === "탁구" && req.body.maxNumberPeople > 4) throw new Error("탁구은 최대 4명까지만 이용가능!");
        if(await Teams.findOne({teamName : req.body.teamName}))
        throw new Error("이미 있는 팀이름 입니다. 다른 팀이름으로 해주세요!");
        if(await Teams.findOne({$and :[{sport:req.body.selectedSports},{wantPlayDate:req.body.wantPlayDate},{wantPlayTime:{$in:req.body.wantPlayTime}}]}))//스포츠 && 데이트 && 시간(하나라도 잇으면) 있으면 오류
        throw new Error("이미 예약되어있습니다");

        const user = await User.findOne({_id:req.body._id});
        await new Teams({
            writer : req.body._id,
            teamName: req.body.teamName,
            sport : req.body.selectedSports,
            wantPlayTime: req.body.wantPlayTime,
            wantPlayDate : req.body.wantPlayDate,
            say : req.body.say,
            maxNumberPeople :req.body.maxNumberPeople,
            countNumberPeople : 1,
            members : [
                {   
                    _id: user._id,
                    name : user.name,
                    email : user.email,
                    phoneNumber : user.phoneNumber,
                    sex : user.sex,
                    major : user.major,
                    createdAt : user.createdAt
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
        const user = await User.findOne({ "sessions._id": [sessionId] });
        const _id = user._id;
        const board = await Teams.find({writer:{_id}},null,{
            sort:{createAt:-1}
        });
        res.json({board});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/includeList", async (req,res) => {
    try{
        const sessionId = req.body.sessionId;//localStorage의 sessionId값
        const user = await User.findOne({ "sessions._id": [sessionId] });
        const _id = user._id;
        const board = await Teams.find({"members":{$elemMatch:{"_id":_id}}},null,{
            sort:{createAt:-1}
        });
        res.json({board});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/exitTeam",async(req,res) =>{
    try{
        const sessionId = req.body.sessionId;//localStorage의 sessionId값
        const user = await User.findOne({ "sessions._id": [sessionId] });
        const _id = user._id.toString();
        if(_id === req.body.writer)
        throw new Error("조장님 나가시면 안되요!!!");

        await Teams.findByIdAndUpdate(req.body._id,
            {
                $pull: { 'members': { "_id": user._id } }
                ,
                $inc: { countNumberPeople: -1 }
            }).exec();
        res.json({message: "exit team success"});
    } catch (err) {
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/checkedTime",async(req,res)=>{
    try{
        const findall = await Teams.find({$and :[{sport:req.body.selectedSports},{wantPlayDate:req.body.wantPlayDate}]},{wantPlayTime:true});//스포츠 && 데이트인 모든 테이블의 시간만 추출
        const reducer = findall.reduce((accumulator,currentValue)=>accumulator.concat(currentValue.wantPlayTime),[]);//시간을 새로운 배열에 합쳐줌
        res.json({reducer});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/modify/checkedTime",async(req,res)=>{
    try{
        const _id = req.body._id;
        const board = await Teams.findOne({_id:_id});
        const findall = await Teams.find({$and :[{sport:req.body.selectedSports},{wantPlayDate:req.body.wantPlayDate}]},{wantPlayTime:true});//스포츠 && 데이트인 모든 테이블의 시간만 추출
        const reducer = findall.reduce((accumulator,currentValue)=>accumulator.concat(currentValue.wantPlayTime),[]);//시간을 새로운 배열에 합쳐줌
        res.json({reducer,board});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

// teamRouter.post("/getMakeTeam",async(req,res) =>{
//     try{
       
//         const board = await Teams.findOne({_id:_id});
//         res.json({board});
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({message:err.message});
//     }
// })

teamRouter.get("/participate",async (req,res)=>{
    try{
        const boardAll = await Teams.find({},null,{
            sort:{createAt:-1}
        });
        res.json({boardAll});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
})

teamRouter.post("/participate/count", async (req, res) => {
    try {
        const teamId = req.body._id;// Teams DB의 _id
        const sessionid = req.body.sessionId
        if(!sessionid)
        throw new Error("로그인 먼저해!!");


        const team = await Teams.findOne({ "_id": teamId });// 참가버튼 누른 테이블의 아이디
        const user = await User.findOne({ "sessions._id": [sessionid] });// 지금 로그인한 유저의 세션


        if (team.countNumberPeople < team.maxNumberPeople) {  
            
            const phoneArr = []
            team.members.forEach(e => {
                phoneArr.push(e.phoneNumber);
            });

            if(!(phoneArr.includes(user.phoneNumber))){
                Teams.findOneAndUpdate({ _id: teamId },
                    {
                        $push: {
                            members: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                sex: user.sex,
                                major: user.major,
                                createdAt: user.createAt
                            }
                        },
                        $inc: { countNumberPeople: 1 }
                }).exec(); 
                res.json({message: "Team make success"})
            }else{
                throw new Error("이미 참가했습니다.");
            }
        }else{
            throw new Error("한발 늦었습니다...");
        }       
    }catch (err) {
        console.error(err);
        res.status(400).json({message:err.message});
    }
})



teamRouter.post("/delete",async(req,res) =>{
    try{
        await Teams.remove({
            _id:req.body._id
        });
        res.json({message: "success delete"});
    } catch (err) {
        console.error(err);
        res.status(400).json({message:err.message});
    }
})


teamRouter.post("/update",async(req,res)=>{
    try{
        if(req.body.teamName==="") throw new Error("팀이름을 적으세요!!");
        if(req.body.selectedSports ==="스포츠선택") throw new Error("스포츠를 선택하세요!");
        if(req.body.maxNumberPeople < 2) throw new Error("혼자할거야....???? 안돼!!!!!");
        if(req.body.wantPlayTime.length===0) throw new Error("시간을 골라주세요!");
        if(req.body.say==="") throw new Error("모집문장을 적으세요!!");
        if(req.body.selectedSports === "풋살" && req.body.maxNumberPeople > 8) throw new Error("풋살은 최대 8명까지만 이용가능!");
        if(req.body.selectedSports === "농구" && req.body.maxNumberPeople > 10) throw new Error("농구은 최대 10명까지만 이용가능!");
        if(req.body.selectedSports === "탁구" && req.body.maxNumberPeople > 4) throw new Error("탁구은 최대 4명까지만 이용가능!");
        if(await Teams.findOne({$and :[{sport:req.body.selectedSports},{wantPlayDate:req.body.wantPlayDate},{wantPlayTime:{$in:req.body.wantPlayTime}}]}))//스포츠 && 데이트 && 시간(하나라도 잇으면) 있으면 오류
        throw new Error("이미 예약되어있습니다");


        await Teams.findByIdAndUpdate(
            req.body._id,
            {
                $set:{
                    teamName: req.body.teamName,
                    sport : req.body.selectedSports,
                    wantPlayTime: req.body.wantPlayTime,
                    wantPlayDate : req.body.wantPlayDate,
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