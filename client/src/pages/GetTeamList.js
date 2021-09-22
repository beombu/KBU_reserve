import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


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
                    <tr>
                    <td>
                        {item.createdAt.substring(0,10)}
                    </td>
                    <td>
                        {item.name}
                    </td>
                    </tr>
                ));
                console.log("sljr: " ,boardList);
                setBoardList(boardList);
            }else{
                boardList = (
                    <tr>
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
        <table style={{
                    margin : 50,
                       height: 100,
                       width : 500,
                       }}>
            <caption>나의 팀모집 목록</caption>
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>이름</th>
                </tr>
            </thead>
            <tbody> { boardList } </tbody>
        </table>
        </>
    )
}



export default GetTeamList;