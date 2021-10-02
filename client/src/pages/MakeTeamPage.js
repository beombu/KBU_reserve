import React, {useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { toast} from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import CustomSelect from "../components/CustomSelect";
import CustomCheckBox from "../components/CustomCheckBox";
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const MakeTeamPage = () =>{
    const [teamName, setTeamName] = useState("");//팀이름
    const [say, setSay] = useState("");//멘트
    const [phoneNumber, setPhoneNumber] = useState("");//전화번호
    const [numberPeople, setNumberPeople] = useState("");//모집인원수
    const sportsArray = ["스포츠선택","풋살", "농구", "탁구"];
    const [selectedSports, setSelectedSports] = useState("");
    //암호, 원하는 시간 넣을것
    // const [checkedInputs, setCheckedInputs] = useState([]);
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const [wantPlayDate, setWantPlayDate] = useState(new Date());
    const [personName, setPersonName] = useState([]);
    const [teamPw, setTeamPw] = useState("");//팀 암호
    const [me,] = useContext(AuthContext);
    const history = useHistory();
    var parseNumberPeople = 0;
    var parseCheckdOne = "";
    var parseCheckedTwo = "";
    var parseCheckedThree = "";
    const selectTime = [
        '08:00 ~ 10:00',
        '10:00 ~ 12:00',
        '12:00 ~ 14:00',
        '14:00 ~ 16:00',
        '16:00 ~ 18:00',
        '18:00 ~ 20:00',
        '20:00 ~ 22:00',
        '22:00 ~ 24:00',
    ]
    

    const timeHandler = (e) => {
        const {
          target: { value },
        } = e;
        setPersonName(
          // On autofill we get a the stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const submitHandler = async (e) =>{
        try{
            e.preventDefault();
            console.log("너 어떻게 출력해?",personName );
            parseNumberPeople = parseInt(numberPeople);
            parseCheckdOne = checkedOne.toString();
            parseCheckedTwo = checkedTwo.toString();
            parseCheckedThree = checkedThree.toString();
            // dateFilter = wantPlayDate.toISOString().substring(0,10);//2021-10-02형식
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
                "wantPlayDate" : wantPlayDate,
                "teamPw" : teamPw,
            }
            if(selectedSports === "풋살" && parseNumberPeople > 8) throw new Error("풋살은 최대 8명까지만 이용가능!");
            if(selectedSports === "농구" && parseNumberPeople > 10) throw new Error("농구은 최대 10명까지만 이용가능!");
            if(selectedSports === "탁구" && parseNumberPeople > 4) throw new Error("탁구은 최대 4명까지만 이용가능!");
            if(selectedSports ==="스포츠선택") throw new Error("스포츠를 선택하세요!");
            if(phoneNumber.length !== 11) throw new Error("전화번호를 확인해주세요!");
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
                    <div style={{ textAlign: "center" }}>
                    <label>
                        원하는 시간
                    </label>
                    </div>
                    <CustomCheckBox label="오전(09:00~12:00)" value={checkedOne} setValue ={setCheckedOne}/>
                    <CustomCheckBox label="오후(13:00~17:00)" value={checkedTwo} setValue ={setCheckedTwo}/>
                    <CustomCheckBox label="야간(18:00~22:00)" value={checkedThree} setValue ={setCheckedThree}/>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        value={wantPlayDate}
                        onChange={(e) => {
                            setWantPlayDate(e);
                        }}
                        renderInput={(wantPlayDate) => <TextField {...wantPlayDate} />}
                    />
                </LocalizationProvider>
                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">원하는 시간(중복선택가능)</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            fullWidth
                            value={personName}
                            onChange={timeHandler}
                            input={<OutlinedInput label="원하는 시간(중복선택가능)" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {selectTime.map((time) => (
                                <MenuItem key={time} value={time}>
                                    <Checkbox checked={personName.indexOf(time) > -1} />
                                    <ListItemText primary={time} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <CustomInput label = "참가비밀번호(없으면 공백)" value ={teamPw} setValue={setTeamPw}/>
                <TextareaAutosize
                    defaultValue={say}
                    onChange ={(e)=>setSay(e.target.value)}
                    maxRows={10}
                    aria-label="maximum height"
                    placeholder="모집할 문장을 적으세요."
                    style={{ width: "100%",height: 150, marginTop:10}}

                />
                
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              글쓰기
            </Button>
            </form>
        </div>
    )

}

export default MakeTeamPage;