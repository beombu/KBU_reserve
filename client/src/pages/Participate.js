import React, {useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import Table from '@mui/material/Table';
import { useHistory } from "react-router";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';




const Participate = () =>{
    
    const [boardList,setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));
    const history = useHistory();
    
    useEffect(() =>{

        getBoradList();
    },[]);
            

    const count = (_id) =>{
        const send_param ={
            sessionId : session,//client's sessionid
            _id : _id//teamdb _id

        };
        if(window.confirm("정말 참가하시겠습니까?")){
             axios.post("/makeTeam/participate/count",send_param)
            .then(returnMessage =>{
                toast.success(returnMessage.message);
                toast.success("참가되었습니다.");
                history.push("participate");//렌더링 문제 해결후 url 수정
            })
            .catch(err=>{
                console.error(err);
                toast.error(err.message);
            })
        }
    }

    const message = (message) =>{
        return alert(message)
    }



    const getBoradList = () =>{
        // const send_param = {
        //     sessionId: session,
        // };
        axios
        .get("/makeTeam/participate")
        .then(returnData =>{
            let boardList;
            if(returnData.data.boardAll.length>0){
                const boards = returnData.data.boardAll;
                boardList = boards.map((item) =>(
                    <TableRow key={item._id} style={{ textAlign: "center" }}>                      
                        <TableCell>{item.teamName}</TableCell>
                        <TableCell >{item.sport}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <Button variant="contained" color="success" size="small" onMouseOver={() => message(item.say)}>메시지</Button>
                        </TableCell>
                        <TableCell> 
                            {item.countNumberPeople + " / " + item.maxNumberPeople} 
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="success" size="small" onClick = {() => count(item._id)}>참가하기</Button>
                        </TableCell>
                    </TableRow>
                ));
                setBoardList(boardList);
            }else{
                boardList = (
                    <TableRow style={{textAlign : "center"}}>
                    <TableCell colSpan="2">작성한 게시글이 존재하지 않습니다.</TableCell>
                    </TableRow>
                );
                setBoardList(boardList);
            }
        })
        .catch(err =>{
            console.log(err);
        })
        
    }
    return (
        <>
            <h1 style={{
                marginTop: 80,
                textAlign: "center"
            }}>나의 팀모집 목록</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ textAlign: "center" }}>
                            <TableCell>팀명</TableCell>
                            <TableCell>종목</TableCell>
                            <TableCell>시간</TableCell>
                            <TableCell>메시지</TableCell>
                            <TableCell>현재원 / 모집인원</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boardList}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
};

export default Participate;