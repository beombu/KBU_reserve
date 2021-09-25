import React, {useContext, useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast} from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory, useParams } from "react-router";
import CustomSelect from "../components/CustomSelect";
import CustomCheckBox from "../components/CustomCheckBox";

const ModifyMakeTeam = () =>{
    var _id = useParams();
    const [teamName, setTeamName] = useState("");//팀이름
    const [say, setSay] = useState("");//멘트
    const [phoneNumber, setPhoneNumber] = useState("");//전화번호
    const [numberPeople, setNumberPeople] = useState("");//모집인원수
    const sportsArray = ["스포츠선택","풋살장", "농구장", "탁구장"];
    const [selectedSports, setSelectedSports] = useState("");
    //암호, 원하는 시간 넣을것
    // const [checkedInputs, setCheckedInputs] = useState([]);
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const [teamPw, setTeamPw] = useState("");//팀 암호
    const [me,setMe] = useContext(AuthContext);
    const history = useHistory();
    var parseNumberPeople = 0;
    var parseCheckdOne = "";
    var parseCheckedTwo = "";
    var parseCheckedThree = "";

    useEffect(() =>{
        getMakeTeam();
    },[]);

    const getMakeTeam = ()=>{
        const send_param ={
            _id: _id.data
        };
        axios.post("/makeTeam/getMakeTeam",send_param)
        .then(returnData=>{
            setTeamName(returnData.data.board.teamName);
            setSelectedSports(returnData.data.board.setSelectedSports);
            setPhoneNumber(returnData.data.board.phoneNumber);
            setNumberPeople(returnData.data.board.maxNumberPeople);
            setTeamPw(returnData.data.board.teamPw);
            setSay(returnData.data.board.say);
        })
        .catch(err =>{
            console.log(err);
        })
    }




    const submitHandler = async (e) =>{
        try{
            e.preventDefault();
            parseNumberPeople = parseInt(numberPeople);
            parseCheckdOne = checkedOne.toString();
            parseCheckedTwo = checkedTwo.toString();
            parseCheckedThree = checkedThree.toString();

            if(parseCheckdOne === "true") parseCheckdOne = "오전(09:00~12:00)"
            else parseCheckdOne = ""
            if(parseCheckedTwo === "true") parseCheckedTwo = "오후(13:00~17:00)"
            else parseCheckedTwo = ""
            if(parseCheckedThree === "true") parseCheckedThree = "야간(18:00~22:00)"
            else parseCheckedThree = ""
            const send_param = {
                "_id" : me.userId,
                "teamName" : teamName,
                "say": say,
                "phoneNumber" : phoneNumber,
                "maxNumberPeople" :parseNumberPeople,
                "selectedSports" :selectedSports,
                "wantPlayTime" : [parseCheckdOne,parseCheckedTwo,parseCheckedThree],
                "teamPw" : teamPw,
            }
            if(selectedSports === "풋살장" && parseNumberPeople > 8) throw new Error("풋살장은 최대 8명까지만 이용가능!");
            if(selectedSports === "농구장" && parseNumberPeople > 10) throw new Error("농구장은 최대 10명까지만 이용가능!");
            if(selectedSports === "탁구장" && parseNumberPeople > 4) throw new Error("탁구장은 최대 4명까지만 이용가능!");
            if(selectedSports ==="스포츠선택") throw new Error("스포츠를 선택하세요!");
            if(phoneNumber.length !== 11) throw new Error("전화번호를 확인해주세요!");
            await axios.post("/makeTeam/update",send_param);
            toast.success("업데이트 완료!");
            history.push("/");
        } catch(err){
            console.error(err);
            toast.error(err.message);
        }
    }

    return (
        <div style={{
            marginTop:100,
            maxWidth:400,
            marginLeft:"auto",
            marginRight:"auto",
        }}>
            <h3>팀만들기 작성</h3>
            <form onSubmit={submitHandler}>
                <CustomInput label = "팀이름" value={teamName} setValue={ setTeamName }/>
                <CustomSelect label = "스포츠  :  " value={selectedSports} selectArray = {sportsArray} setValue = {setSelectedSports}/>
                <CustomInput label = "전화번호(ex:01012345678)" value={phoneNumber} setValue = { setPhoneNumber }/>
                <CustomInput label = "모집인원" value={numberPeople} type="number" setValue = { setNumberPeople }/>
                <div>
                    <div>
                    <label>
                        원하는 시간
                    </label>
                    </div>
                    <CustomCheckBox label="오전(09:00~12:00)" value={checkedOne} setValue ={setCheckedOne}/>
                    <CustomCheckBox label="오후(13:00~17:00)" value={checkedTwo} setValue ={setCheckedTwo}/>
                    <CustomCheckBox label="야간(18:00~22:00)" value={checkedThree} setValue ={setCheckedThree}/>
                </div>
                <CustomInput label = "참가비밀번호(없으면 공백)" value ={teamPw} setValue={setTeamPw}/>

                <CustomInput label = "모집 문장" value={say} setValue = { setSay }/>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )

}

export default ModifyMakeTeam;