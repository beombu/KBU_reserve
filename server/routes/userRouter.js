const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare} = require("bcryptjs");//비밀번호에 hash라는 랜덤한 수를 생성해줌, compare는 PW와 PW확인을 비교해줌
const mongoose = require("mongoose");


userRouter.post("/register", async(req,res)=>{

    try{
        if(req.body.password.length<6)
        throw new Error("비밀번호를 6자 이상으로 해주세요.");
        if(req.body.username.length<3)
        throw new Error("username은 3자 이상으로 해주세요.");
        if(req.body.password !== req.body.passwordCheck)
        throw new Error("비밀번호가 달라요!");
        if(await User.findOne({username : req.body.username}))
        throw new Error("ID가 존재합니다. 다른 아이디를 설정해주세요!");
        if(await User.findOne({email : req.body.email}))
        throw new Error("이미 있는 이메일입니다.");
        if(await User.findOne({phoneNumber : req.body.phoneNumber})||req.body.phoneNumber.length !== 11)
        throw new Error("전화번호를 확인해주세요!");
        if(await User.findOne({kbuCode : req.body.kbuCode})||req.body.kbuCode.length !== 9)
        throw new Error("학번을 확인해주세요!");
        if (req.body.selectedSex === "") throw new Error("성별을 선택하세요!");
        if (req.body.selectedMajor === "") throw new Error("학과를 선택하세요!");

        const hashedPassword = await hash(req.body.password,10);
        const user = await new User({
            name: req.body.name,
            username:req.body.username,
            hashedPassword,
            email : req.body.email,
            phoneNumber : req.body.phoneNumber,
            sex : req.body.selectedSex,
            major : req.body.selectedMajor,
            kbuCode : req.body.kbuCode,
            sessions:[{createdAt:new Date()}]
        }).save();
        console.log(user);
        const session = user.sessions[0];
        res.json({ message: "user registered", userId:user.id, sessionId:session._id, name:user.name});
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message});
    }
});
userRouter.patch("/login", async(req, res) =>{

    try{
        const user = await User.findOne({ username:req.body.username });
        if(!user)
        throw new Error("가입되지 않은 아이디 입니다.");
        const isValid = await compare(req.body.password,user.hashedPassword);
        if(!isValid)
        throw new Error("입력하신 정보가 올바르지 않습니다.");
        user.sessions.push({createdAt: new Date() });
        const session = user.sessions[user.sessions.length-1];
        await user.save();
        res.json({
            message:"user validated",
            sessionId:session._id,
            name: user.name,
            userId: user._id,
        });
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

userRouter.patch("/logout", async(req, res)=>{
    try{
        if(!req.user) throw new Error("invalid sessionid");
        await User.updateOne(
            {_id: req.user.id},//_id가 같은것은 찾는다.(updateOne의 첫번째 인자)
            {$pull:{sessions:{_id:req.headers.sessionid}}}//수정하고 싶은 것을 적는다.(두번째 인자)
        );
        res.json({message: "user is logged out."});
    } catch(err) {
        res.status(400).json({message: err.message});

    }
})

userRouter.get("/me",(req,res) =>{
    try{
        if(!req.user) throw new Error("권한이 없습니다.");
        res.json({
            message:"success",
            sessionId : req.headers.sessionid,
            name: req.user.name,
            userId: req.user.id,
        })
    } catch(err){
        console.error(err);
        res.status(400).json({message: err.message});
    }
})

module.exports ={ userRouter };