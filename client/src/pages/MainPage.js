import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Carousel from 'react-material-ui-carousel';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
import { Paper, Button } from '@material-ui/core';


// return (
//     <Carousel>
//         {items.map((item, i) => (
//             <MainPage key={i} {...item} />
//         ))}
//     </Carousel>
// );





const MainPage = ({ name, description }) => {
    const history = useHistory();
    const checkSessionId = localStorage.sessionId;
    const sessionIdUrl = "http://localhost:5000/index/" + checkSessionId;

    const onLinkClick = () => {
        toast.error("로그인해!");
        history.push('/');
    }


    const items = [
        {
            name: '제 1회 총장배 풋살대회',
            description: '상금 30만원',
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


    const Item = ({ name, description }) => {
        return (
            <Paper>
                <h2>{name}</h2>
                <p>{description}</p>
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


            {checkSessionId ? (
                    <>
                        <Link to="/makeTeam">
                            <span style={{ marginRight: 100 }} >팀만들기</span>
                        </Link>

                        <Link to="/participate">
                            <span style={{ marginRight: 0 }} > 임시 버튼</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" onClick={onLinkClick}>
                            <span style={{ marginRight: 100 }} >팀만들기</span>
                        </Link>
                        <Link to="/" onClick={onLinkClick}>
                            <span>팀참가하기</span>
                        </Link>
                    </>
                )}
        </div>
    )
};

export default MainPage;