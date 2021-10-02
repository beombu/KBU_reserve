import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Carousel from 'react-material-ui-carousel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function Carousell(props) {
    const items = [
        {
            name: 'Aya Bouchiha',
            description: 'Full Stack Web Developer',
        },
        {
            name: 'John Doe',
            description: 'Author',
        },
        {
            name: 'Pitsu Coma',
            description: 'Math Student',
        },
    ];

    return (
        <Carousel>
            {items.map((item, i) => (
                <MainPage key={i} {...item} />
            ))}
        </Carousel>
    );
}

const MainPage = ({name,description}) => {
    const history = useHistory();
    const checkSessionId = localStorage.sessionId;


const onLinkClick= () =>{
    toast.error("로그인해!");
    history.push('/');
}

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: 50 }}>KBU 예약 시스템!</h2>
            <Paper>
            <h2>{name}</h2>
            <p>{description}</p>
            <Button>more info...</Button>
        </Paper>


            {checkSessionId ? (
                <>
                    <Link to="/makeTeam">
                        <span style={{ marginRight: 100 }} >팀만들기</span>
                    </Link>
                    <Link to="/participate">
                        <span style={{ marginRight: 100 }} > 임시 버튼</span>
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