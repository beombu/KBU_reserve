import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


const GetTeamList = () =>{
    
    const [boardList,setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));
    const history = useHistory();
    const firstRender = useRef(true);
    console.log("로그찍기",boardList);

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
        const send_param = {
            sessionId: session,
        };
        axios
        .post("/makeTeam/getBoardList",send_param)
        .then(returnData =>{
            let boardList;
            if(returnData.data.board.length>0){
                const boards = returnData.data.board;
                boardList = boards.map((item) =>(
                    <tr key= {item._id} style={{textAlign : "center"}}>
                    <td>{item.createdAt.substring(0,10)}</td>
                    <td>{item.teamName}</td>
                    <td>{item.sport}</td>
                        <td>{item.wantPlayTime}</td>
                        <td>{item.teamPw}</td>
                        <td>{item.maxNumberPeople}</td>
                        <td>{item.say}</td>
                    <td>
                        <Link to={"/makeTeam/modify/"+item._id}> <input type='button' value='수정' /></Link>
                        <input type='button' value="삭제" onClick={() => removePost(item._id)} />
                    </td>
                    </tr>
                ));
                setBoardList(boardList);
            }else{
                boardList = (
                    <tr style={{textAlign : "center"}}>
                        <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
                    </tr>
                );
                setBoardList(boardList);
            }
        })
        .catch(err =>{
            console.log(err);
        })
        
    }
    return(
        <>
        <h1 style={{marginTop:80,
                    textAlign : "center"
                    }}>나의 팀모집 목록</h1>
        <Table striped bordered hover size="sm">
            <thead>
                <tr style={{textAlign : "center"}}>
                    <th>날짜</th>
                    <th>팀이름</th>
                    <th>종목</th>
                    <th>원하는 시간</th>
                    <th>팀패스워드(없을시 공백)</th>
                    <th>최대모집인원</th>
                    <th>모집 문장</th>
                    <th>편집</th>
                </tr>
            </thead>
            <tbody>{boardList}</tbody>
            </Table>
        </>
    )
};

export default GetTeamList;