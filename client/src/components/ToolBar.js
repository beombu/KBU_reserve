import axios from "axios";
import React, {useContext} from "react";
import { Link } from "react-router-dom";//해당 url로 이동시켜주는 API
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
// import { useHistory } from "react-router";
import "./ToolBar.css";



const ToolBar = ()=>{
    const [me,setMe] = useContext(AuthContext);
    // const history = useHistory();
    
    const logoutHandler = async() =>{
        try{
            await axios.patch("/users/logout");
            setMe();//초기화
            localStorage.removeItem("sessionId");
            delete axios.defaults.headers.common.sessionid;
            console.log(me);
            // history.push('/');
            toast.success("로그아웃 성공");

        } catch (err){
            console.error(err);
            toast.error(err.message);
        }

    }

    return (
        <div>
            <Link to="/">
            <span>홈</span>
            </Link>

            {me ? (
                <>
                <div className="profile">
                    <span>마이페이지</span>
                    <ul className="menu">
                        <li><Link to="/mypage/getteamlist">나의 팀 모집</Link></li>
                    </ul>
                    </div>
                <span onClick={logoutHandler} style={{ float : "right", cursor:"pointer"}}>로그아웃({me.name})</span>

                </>
                ) : (
                <>      <Link to="/auth/login">
                    <span style={{ float: "right" }}>로그인</span>
                </Link>
                    <Link to="/auth/register">
                        <span style={{ float: "right", marginRight: 15 }}>회원가입</span>
                    </Link>
                </>
            )}



        </div>
    )
}

export default ToolBar;

