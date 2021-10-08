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
import ButtonImg1 from '../img/Carousel/MakeTeam.png';
import ButtonImg2 from '../img/Carousel/Facilities.png';
import imgUrl1 from '../img/Carousel/kbu.png';
import imgUrl2 from '../img/Carousel/contest.png';
import imgUrl3 from '../img/Carousel/football.png';
import imgUrl4 from '../img/Carousel/basketball.png';
import Tooltip from '@mui/material/Tooltip';
import { green } from "@mui/material/colors";



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
                            <TableCell style={{ width:70, textAlign: "center" }}>{item.teamName}</TableCell>
                            <TableCell style={{ width:50, textAlign: "center" }}>{item.sport}</TableCell>
                            <TableCell style={{ width:200, textAlign: "center" }}>{item.wantPlayDate.substring(0, 10)}<br />{item.wantPlayTime.join("\r\n")}</TableCell>
                            <TableCell style={{ width:50 ,textAlign: "center" }}>
                                <Tooltip title={<h1>{item.say}</h1>}>
                                    <Button>보기</Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell style={{ width:180, textAlign: "center" }}>
                                {item.countNumberPeople + " / " + item.maxNumberPeople}
                            </TableCell>
                            <TableCell style={{ width:70 , textAlign: "center"}}>
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
            name: "팀 만들기(click me!)",
            description: "Let's make a team",
            img: ButtonImg1,
            targetUrl:"/makeTeam"
        },
        {
            name: "시설 안내(click me!)",
            description: "About facilities",
            img: ButtonImg2,
            targetUrl: "/introduce/Football"
        }
    ];
    const items2 = [
        {
            img: ButtonImg1,      
        },
        {
            img: ButtonImg2,
        }
    ];

    const items3 = [
        {
            img: imgUrl1,
        },
        {
            img: imgUrl2,
        },
        {
            img: imgUrl3,
            
        },
        {
            img: imgUrl4,   
        }
    ];

    const IMG1 = styled.img`
        width: 600px;
        height: 150px;  
    `;

    const IMG2 = styled.img`
        width: 600px;
        height: 300px;  
    `;

    const Item1 = ({name, description, img, targetUrl}) => {
        return (
            <Paper style={{marginTop: '40px'}}>
                {/* <h2 style={{color: "green", marginTop: "70px"}} onClick={() => window.location.replace(targetUrl)} >{name}</h2>
                <p style={{color: "green", lineHeight: '0', marginBottom: "50px"}}>{description}</p> */}
                <IMG1  style={{ display: "flex"}}
                    src={img}
                    onClick={() => window.location.replace(targetUrl)}
                />         
            </Paper>
        );
    };
    const Item2 = ({name, description, img}) => {
        return (
            <Paper style={{marginTop: '40px'}}> 
                {/* <h2 style={{color: "green", marginTop: "70px"}} onClick={() => onLinkClick()} >{name}</h2>
                <p style={{color: "green", lineHeight: '0', marginBottom: "50px"}}>{description}</p> */}

                <IMG1  style={{ display: "flex"}}
                    src={img}
                    onClick={() => onLinkClick()} 
                />
            </Paper>
        );
    };

    const Item3 = ({img}) => {
        return (
            <Paper style={{marginTop: '30px'}}>
                <IMG2 style={{ display: "flex"}}
                    src ={ img }
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

                    <Carousel>
                        {items3.map((item, i) => (
                            <Item3 key={i} {...item} />
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

                        <Carousel>
                            {items3.map((item, i) => (
                                <Item3 key={i} {...item} />
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
                    <Table aria-label="simple table" style={{minWidth:650}}>
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