import React, {useState, useEffect}  from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const MainPage = () => {
    const history = useHistory();
    const [boardList, setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const count = (_id) => {
        const send_param = {
            sessionId: session,//client's sessionid
            _id: _id//teamdb _id

        };
        if (window.confirm("정말 참가하시겠습니까?")) {
            axios.post("/makeTeam/participate/count", send_param)
                .then(() => {
                    toast.success("참가되었습니다.");
                    window.location.replace("/")
                })
                .catch((error) => {
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


    const getBoradList = () => {
        axios
            .get("/makeTeam/participate")
            .then(returnData => {
                let boardList;
                if (returnData.data.boardAll.length > 0) {
                    const boards = returnData.data.boardAll;
                    boardList = boards.map((item) => (
                        <TableRow key={item._id} style={{ textAlign: "center" }}>
                            <TableCell>{item.teamName}</TableCell>
                            <TableCell >{item.sport}</TableCell>
                            <TableCell>{item.wantPlayDate.substring(0, 10)}<br />{item.wantPlayTime.join(",\r\n")}</TableCell>
                            <TableCell>
                                <div>
                                    <Button onClick={handleOpen}>보기</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                우리 같이 운동해요~~😘
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {item.say}
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                            </TableCell>
                            <TableCell>
                                {item.countNumberPeople + " / " + item.maxNumberPeople}
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="success" size="small" onClick={() => count(item._id)}>참가하기</Button>
                            </TableCell>
                        </TableRow>
                    ));
                    setBoardList(boardList);
                } else {
                    boardList = (
                        <TableRow style={{ textAlign: "center" }}>
                            <TableCell colSpan="2">게시글이 존재하지 않습니다.</TableCell>
                        </TableRow>
                    );
                    setBoardList(boardList);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    useEffect(() => {

        getBoradList();
    }, [open]);


    const onLinkClick = () => {
        toast.error("로그인해!");
        history.push('/');
    }

    const items = [
        {
            name: '코로나로 지처있던 학우들의 화합을 위하여 만들었습니다!',
            description: 'from 범철, 상준',
            imgURL: ''
        },
        {
            name: '제 1회 총장배 농구대회',
            description: '상금 30만원',
            imgURL: ''
        },
        {
            name: '제 1회 총장배 탁구대회',
            description: '상금 30만원',
            imgURL: ''
        },
    ];

    const IMG = styled.img`
        width: 300px;
        height: 400px;
        padding: 100;     
        width: 100%;
    `;

    const Item = ({ name, description, imgURL }) => {
        return (
            <Paper>
                <h2>{name}</h2>
                <p>{description}</p>
                <IMG
                    src={imgURL}
                />
            </Paper>
        );
    };

    return (

        <div style={{ textAlign: "center" }}>

            <Carousel>
                {items.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </Carousel>
            {session ? (
                    <>
                        <Link to="/makeTeam">
                            <span style={{ marginRight: 100 }} >팀만들기</span>
                        </Link>
                        <Link to="/introduce/Football">
                            <span style={{ marginRight: 100 }} >임시버튼</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" onClick={onLinkClick}>
                            <span style={{ marginRight: 100 }} >팀만들기</span>
                        </Link>
                    </>
                )
                }
            <>
                <h2 style={{
                    marginTop: 40,
                    textAlign: "center"
                }}>현재 팀 목록</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
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
        </div>

    )
};

export default MainPage;