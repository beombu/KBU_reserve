import React, {useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
    // const firstRender = useRef(true);


    useEffect(() =>{
        // if(firstRender){
        //     firstRender.current = false;
        //     return;
        // }
        getMyTeamList();
    },[]);
            
    const exitTeam = (_id,writer) =>{
        const send_param ={
            sessionId : session,//client's sessionid
            _id : _id,//teamdb _id
            writer : writer,

        };
        if(window.confirm("정말 나가시겠습니까?")){
             axios.post("/makeTeam/exitTeam",send_param)
            .then(() =>{
                toast.success("팀에서 나가셨습니다!");
                window.location.replace("/mypage/includeteampage")
            })
            .catch((error)=>{
                if (error.response) {
                  // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                  toast.error(error.response.data.message);
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                }
                else if (error.request) {
                  // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                  // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                  // Node.js의 http.ClientRequest 인스턴스입니다.
                  console.log(error.request);
                }
                else {
                  // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
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
                        <TableCell>{item.wantPlayDate.substring(0,10)}<br/>{item.wantPlayTime.join(",\r\n")}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="success" size="small" onClick={() => message(item.say)}>메시지</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="success" size="small" onClick = {() => exitTeam(item._id,item.writer)}>나가기</Button>
                        </TableCell>
                    </TableRow>
                ));
                setBoardList(boardList);
            }else{
                boardList = (
                    <TableRow style={{textAlign : "center"}}>
                    <TableCell colSpan="2">팀이 존재하지 않습니다.</TableCell>
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
                            <TableCell>팀이름</TableCell>
                            <TableCell>종목</TableCell>
                            <TableCell>시간</TableCell>
                            <TableCell>메시지</TableCell>
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