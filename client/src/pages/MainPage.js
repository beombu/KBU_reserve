import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";


const MainPage = () => {
    const history = useHistory();
    const checkSessionId = localStorage.sessionId;


const onLinkClick= () =>{
    toast.error("로그인해!");
    history.push('/');
}

    return (
        <div style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: 50 }}>KBU 예약 시스템!</h2>

            {checkSessionId ? (
                <>
                    <Link to="/makeTeam">
                        <span style={{ marginRight: 100 }} >팀만들기</span>
                    </Link>
                    <a href="http://localhost:5000/index">
                        팀 참가하기
                    </a>
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