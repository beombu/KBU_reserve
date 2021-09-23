import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";


const MainPage = () => {
    const history = useHistory();

const onLinkClick1= (e) =>{
    e.preventDefault();
    if(localStorage.sessionId) {
        history.push("/makeTeam");
    }
    else{
        toast.error("로그인해!");
        history.push('/');
    }
}

const onLinkClick2= (e) =>{
    e.preventDefault();
    if(localStorage.sessionId) {
        history.push("http://localhost:5000/index");
    }
    else{
        toast.error("로그인해!");
        history.push('/');
    }
}

    return (
        <div style={{textAlign:"center"}}>
            <h2 style={{marginTop:50}}>KBU 예약 시스템!</h2>
                    <Link to="/makeTeam" onClick ={onLinkClick1}>
                        <span style={{ marginRight: 100 }} >팀만들기</span>
                    </Link>
                    <a href="http://localhost:5000/index" onClick={onLinkClick2}>
                        팀 참가하기
                    </a>

        </div>
    )
};

export default MainPage;