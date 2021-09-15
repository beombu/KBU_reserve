import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h2>KBU 예약 시스템!</h2>
            <Link to="/makeTeam">
                <span style = {{marginRight: 100}} >팀만들기</span>
            </Link>
            <a href="http://localhost:5000/index">
                팀 참가하기
            </a>
        </div>
    )
};

export default MainPage;