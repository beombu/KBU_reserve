import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


const GetTeamList = () =>{
    
    const [boardList,setBoardList] = useState([]);
    const [me,setMe] =useContext(AuthContext);

    useEffect(() =>{
        getBoradList();
    },[me]);

    const getBoradList = () =>{
        const send_param = {
            _id : me.userId
        };
        axios
        .post("/makeTeam/getBoardList",send_param)
        .then(returnData =>{
            let boardList;
            console.log("이것은 : ",returnData.data.board);
            console.log("저적은 : " , returnData);
            if(returnData.data.board.length>0){
                const boards = returnData.data.board;
                console.log(boards[0].createdAt.substring(0,10));
                boardList = boards.map(item =>(
                    <tr style={{textAlign : "center"}}>
                    <td>{item.createdAt.substring(0,10)}</td>
                    <td>{item.teamName}</td>
                    <td>{item.sport}</td>
                    <td>{item.wantPlayTime}</td>
                    <td>{item.teamPw}</td>
                    <td>{item.maxNumberPeople}</td>
                    <td>{item.say}</td>
                    </tr>
                ));
                console.log("sljr: " ,boardList);
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
        <Table striped bordered hover>
            <thead>
                <tr style={{textAlign : "center"}}>
                    <th>날짜</th>
                    <th>팀이름</th>
                    <th>종목</th>
                    <th>원하는 시간</th>
                    <th>팀패스워드(없을시 공백)</th>
                    <th>최대모집인원</th>
                    <th>모집 문장</th>
                </tr>
            </thead>
            <tbody>{boardList}</tbody>
            </Table>
        </>
    )
}



export default GetTeamList;