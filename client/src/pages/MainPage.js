import React, {useState, useEffect}  from "react";
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
import imgUrl1 from '../img/Carousel/virus.jpg';
import imgUrl2 from '../img/Carousel/팀만들기.jpg';
import imgUrl3 from '../img/Carousel/총장배.jpg';
import imgUrl4 from '../img/Carousel/시설안내.jpg';
import Tooltip from '@mui/material/Tooltip';



const MainPage = () => {
    const history = useHistory();
    const [boardList, setBoardList] = useState([]);
    const [session,] = useState(localStorage.getItem("sessionId"));


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
                            <TableCell style={{ width:30 }}>{item.sport}</TableCell>
                            <TableCell style={{ width:100 }}>{item.wantPlayDate.substring(0, 10)}<br />{item.wantPlayTime.join("\r\n")}</TableCell>
                            <TableCell>
                                <Tooltip title={<h1>{item.say}</h1>}>
                                    <Button>보기</Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                                {item.countNumberPeople + " / " + item.maxNumberPeople}
                            </TableCell>
                            <TableCell style={{ width:70 }}>
                                <Button style={{ marginLeft:5 }} variant="contained" color="success" size="small" onClick={() => count(item._id)}>참가하기</Button>
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
    }, []);


    const onLinkClick = () => {
        toast.error("로그인해!");
        history.push('/');
    }

    const items1 = [
        {
            img: imgUrl1,
            targetUrl:"/"
        },
        {
            img: imgUrl2,
            targetUrl: "/makeTeam"
        },
        {
            img: imgUrl3,
            targetUrl: "/"
        },
        {
            img: imgUrl4,
            targetUrl: "/introduce/Football"
        }
    ];
    const items2 = [
        {
            img: imgUrl1,
        },
        {
            img: imgUrl2,
            targetUrl: "/"
        },
        {
            img: '',
            targetUrl: "/introduce/BasketBall"
        },
        {
            img: '',
            targetUrl: "/introduce/PingPong" 
        }
    ];

    const IMG = styled.img`
        width: 300px;
        height: 400px;  
        width: 100%;
        border-radius: 5%;
    `;

    const Item1 = ({ img, targetUrl}) => {
        return (
            <Paper style ={{marginTop: "40px", overflow: "hidden", display: "flex", borderRadius: "5%"}}>
                <IMG 
                src ={ img }
                onClick={() => window.location.replace(targetUrl)}>
                </IMG>
            </Paper>
        );
    };
    const Item2 = ({img}) => {
        return (
            <Paper style ={{marginTop: "40px", overflow: "hidden", display: "flex", borderRadius: "5%"}}>
                <IMG 
                    src ={ img }
                    onClick={() => onLinkClick()}
                />
            </Paper>
        );
    };
    return (

        <div>

            {session ? (
                <>
                    <Carousel>
                        {items1.map((item, i) => (
                            <Item1 key={i} {...item} />
                        ))}
                    </Carousel>
                </>
                
            ) : (
                    <>
                        <Carousel>
                            {items2.map((item, i) => (
                                <Item2 key={i} {...item} />
                            ))}
                        </Carousel>
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
                                <TableCell style={{ textAlign: "center" }}>팀명</TableCell>
                                <TableCell style={{ textAlign: "center" }}>종목</TableCell>
                                <TableCell style={{ textAlign: "center" }}>시간</TableCell>
                                <TableCell style={{ textAlign: "center" }}>메시지</TableCell>
                                <TableCell style={{ textAlign: "center" }}>현재인원 / 모집인원</TableCell>
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