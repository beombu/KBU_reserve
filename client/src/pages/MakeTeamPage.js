import React, {useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { toast} from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import CustomSelect from "../components/CustomSelect";

const MakeTeamPage = () =>{
    const [name, setName] = useState("");//이름
    const [say, setSay] = useState("");//멘트
    const [phoneNumber, setPhoneNumber] = useState("");//전화번호
    const [numberPeople, setNumberPeople] = useState("");//모집인원수
    const majorArray = ["학과선택", "성서학과", "사회복지학과", "영유아보육학과", "컴퓨터소프트웨어학과", "간호학과"];
    const [selectedMajor, setSelectedMajor] = useState("");
    const sportsAray = ["스포츠선택","풋살장", "농구장", "탁구장"];
    const [selectedSports, setSelectedSports] = useState("");
    const sexAarry = ["성별선택", "남","여"];
    const [selectedSex, setSelectedSex] = useState("");
    const [me,setMe] = useContext(AuthContext);
    const history = useHistory();
    var parseNumberPeople = 0;

    const submitHandler = async (e) =>{
        try{
            e.preventDefault();
            parseNumberPeople = parseInt(numberPeople);
            const send_param = {
                "_id" : me.userId,
                "name" : name,
                "say": say,
                "phoneNumber" : phoneNumber,
                "parseNumberPeople" :parseNumberPeople,
                "selectedMajor" :selectedMajor,
                "selectedSports" :selectedSports,
                "selectedSex" : selectedSex,
            }
            if(selectedSports === "풋살장" && parseNumberPeople > 8) throw new Error("풋살장은 최대 8명까지만 이용가능!");
            if(selectedSports === "농구장" && parseNumberPeople > 10) throw new Error("농구장은 최대 10명까지만 이용가능!");
            if(selectedSports === "탁구장" && parseNumberPeople > 4) throw new Error("탁구장은 최대 4명까지만 이용가능!");
            if(selectedMajor ==="학과선택") throw new Error("학과를 선택하세요!");
            if(selectedSports ==="스포츠선택") throw new Error("스포츠를 선택하세요!");
            if(selectedSex ==="성별선택") throw new Error("성별을 선택하세요!");
            await axios.post("/makeTeam",send_param);
            toast.success("예약에 성공하셨습니다.");
            history.push("/");
        } catch(err){
            console.error(err);
            toast.error(err.message);
        }
    }

    return (
        <div style={{
            marginTop:100,
            maxWidth:350,
            marginLeft:"auto",
            marginRight:"auto",
        }}>
            <h3>팀만들기 작성</h3>
            <form onSubmit={submitHandler}>
                <CustomInput label = "이름" value={name} setValue={ setName }/>
                <CustomSelect label = "학과  :  " value={selectedMajor} selectArray = {majorArray} setValue = {setSelectedMajor}/>
                <CustomSelect label = "스포츠  :  " value={selectedSports} selectArray = {sportsAray} setValue = {setSelectedSports}/>
                <CustomSelect label = "성별  :  " value={selectedSex} selectArray = {sexAarry} setValue = {setSelectedSex}/>
                <CustomInput label = "전화번호(ex:01012345678)" value={phoneNumber} setValue = { setPhoneNumber }/>
                <CustomInput label = "모집인원" value={numberPeople} type="number" setValue = { setNumberPeople }/>
                <CustomInput label = "모집 문장" value={say} setValue = { setSay }/>
                <button type="submit">버튼</button>
            </form>
        </div>
    )

}

export default MakeTeamPage;