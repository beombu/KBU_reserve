import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import styled from 'styled-components';
// import imgUrl1 from '../img/football.jpg'
// const imgUrl2 = require('../../public/');
// const imgUrl3 = require('../../public/');

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
                    src ={ imgURL }
                />

                {checkSessionId ? (
                    <>
                        <Link to="/makeTeam">
                            <span style={{ marginRight: 100}} >팀만들기</span>
                        </Link>

                        <Link to="/participate">
                            <span style={{ marginRight: 0}} >참가하기</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" onClick={onLinkClick}>
                            <span style={{ marginRight: 100}} >팀만들기</span>
                        </Link>
                        <Link to="/" onClick={onLinkClick}>
                            <span style={{ marginRight: 0}}>참가하기</span>
                        </Link>
                    </>
                    )
                }
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
        </div>
    )
};

export default MainPage;