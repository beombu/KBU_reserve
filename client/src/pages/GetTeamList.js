import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const GetTeamList = () => {

    const [boardList, setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));
    const [open, setOpen] = useState(false);
    const history = useHistory();
    // const firstRender = useRef(true);


    useEffect(() => {
        // if(!boardList) return        
        // if(firstRender){
        //     firstRender.current = false;
        //     return;
        // }
        getBoradList();
    }, [open]);

    const removePost = (_id) => {
        const send_param = {
            _id
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.post("/makeTeam/delete", send_param)
                .then(returnData => {
                    toast.success("글 삭제 성공!");
                    window.location.replace("/mypage/getteamlist")
                })
                .catch(err => {
                    console.error(err);
                    toast.error(err.message);
                })
        }
    }

    const clickHandler = () => {
        setOpen(!open);//이걸로 인해 open = true
    }

    const getBoradList = () => {

        const send_param = {
            sessionId: session,
        };
        axios
            .post("/makeTeam/getBoardList", send_param)
            .then(returnData => {
                let boardList;
                if (returnData.data.board.length > 0) {
                    const boards = returnData.data.board;
                    boardList = boards.map((item, i) =>                  
                    (

                        <React.Fragment key={item._id} >
                            <TableRow
                                sx={{ '& > *': { borderBottom: 'unset' } }}
                            >
                                <TableCell>
                                </TableCell>
                                <TableCell component="th" scope="item">
                                    {item.createdAt.substring(0, 10)}
                                </TableCell>
                                <TableCell>
                                    {item.teamName}
                                </TableCell>
                                <TableCell >{item.sport}</TableCell>
                                <TableCell>
                                    <Link to={"/makeTeam/modify/" + item._id}> <input type='button' value='수정' /></Link>
                                    <input type='button' value="삭제" onClick={() => removePost(item._id)} />
                                </TableCell>
                            </TableRow>
                            <TableRow key={i}>{/* 이건 0->props>children>1 */}
                            {/* {i == index&& open} */}
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                팀원 정보
                                            </Typography>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>이름</TableCell>
                                                        <TableCell>전화번호</TableCell>
                                                        <TableCell>성별</TableCell>
                                                        <TableCell>학과</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {item.members.map((Row) => (
                                                        <TableRow key={Row._id}>
                                                            <TableCell component="th" scope="item">
                                                                {Row.name}
                                                            </TableCell>
                                                            <TableCell>{Row.phoneNumber}</TableCell>
                                                            <TableCell>{Row.sex}</TableCell>
                                                            <TableCell>
                                                                {Row.major}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ));
                    setBoardList(boardList);
                } else {
                    boardList = (
                        <TableRow style={{ textAlign: "center" }}>
                            <TableCell colSpan="2">작성한 게시글이 존재하지 않습니다.</TableCell>
                        </TableRow>
                    );
                    setBoardList(boardList);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }


    // boardlist = boards.map

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
                            <TableCell>
                            <IconButton
                                        size="small"
                                        onClick={() => clickHandler()}
                                    >   
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            </TableCell>
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

export default GetTeamList;