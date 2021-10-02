import React, {useState, useEffect, useRef} from "react";
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



const Participate = () =>{
    
    const [boardList,setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));
    const history = useHistory();
    // const firstRender = useRef(true);

    useEffect(() =>{
        // if(firstRender){
        //     firstRender.current = false;
        //     return;
        // }
        getBoradList();
    },[]);
            

    const removePost = (_id) =>{
        const send_param ={
            _id
        };
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.post("/makeTeam/delete",send_param)
            .then(returnData=>{
                toast.success("글 삭제 성공!");
                history.push("/");//렌더링 문제 해결후 url 수정
            })
            .catch(err=>{
                console.error(err);
                toast.error(err.message);
            })
        }
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
                boardList = boards.map((item,v) =>(
                    <TableRow key={item._id}>
                        <TableCell>
                            {item.createdAt.substring(0,10)}
                        </TableCell>
                        <TableCell>
                            {item.teamName}
                        </TableCell>
                        <TableCell >{item.sport}</TableCell>
                        <TableCell>
                            {item.teamPw}
                        </TableCell>
                        <TableCell>
                            <Link to={"/makeTeam/modify/" + item._id}> <input type='button' value='수정' /></Link>
                            <input type='button' value="삭제" onClick={() => removePost(item._id)} />
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
                            <TableCell>날짜</TableCell>
                            <TableCell>팀이름</TableCell>
                            <TableCell>종목</TableCell>
                            <TableCell>비밀번호</TableCell>
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

export default Participate;