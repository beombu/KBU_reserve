import React, {useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const IncludeTeamPage = () =>{
    
    const [boardList,setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));
    const history = useHistory();
    // const firstRender = useRef(true);


    useEffect(() =>{
        // if(firstRender){
        //     firstRender.current = false;
        //     return;
        // }
        getMyTeamList();
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
                history.push("/");
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


    const getMyTeamList = () =>{

        const send_param = {
            sessionId: session,
        };
        axios
        .post("/makeTeam/includeList",send_param)
        .then(returnData =>{
            let boardList;
            if(returnData.data.board.length>0){
                const boards = returnData.data.board;
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
    console.log("dlsetytm",boardList);

    return (
        <>
            <h1 style={{
                marginTop: 80,
                textAlign: "center"
            }}>나의 팀모집 목록</h1>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow style={{ textAlign: "center" }}>
                        <TableCell/>
                            <TableCell>날짜</TableCell>
                            <TableCell>팀이름</TableCell>
                            <TableCell>종목</TableCell>
                            <TableCell>편집</TableCell>
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

export default IncludeTeamPage;