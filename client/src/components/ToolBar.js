import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";//해당 url로 이동시켜주는 API
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';



const ToolBar = () => {
    const [me, setMe] = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = async () => {
        try {
            await axios.patch("/users/logout");
            setMe();//초기화
            localStorage.removeItem("sessionId");
            delete axios.defaults.headers.common.sessionid;
            toast.success("로그아웃 성공");
            window.location.replace("/");

        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }

    }




    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ background: 'green' }} position="static">
                <Toolbar>
                    <Link to="/">
                        <HomeIcon style={{ color: 'white' }} fontSize="large" sx={{ mr: 2 }} />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: 'white' }}>
                        KBU Sports
                    </Typography>


                    {me ? (
                        <>        
                            <AccountBoxIcon onMouseOver={handleClick} style={{ color: 'white', padding: '10px' }}>마이페이지</AccountBoxIcon>
                            
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClick={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <div>
                                <a href="http://localhost:3000/mypage/getteamlist">
                                    <MenuItem style ={{width:"100%", height:40}}>만든 팀</MenuItem>
                                </a>
                                <a href="http://localhost:3000/mypage/includeteampage">
                                    <MenuItem style ={{width:"100%", height:40}}>참가한 팀</MenuItem>
                                </a>
                                </div>
                            </Menu>
                            
                            <LogoutIcon onClick={logoutHandler} style={{ color: 'white', padding: '10px' }}>로그아웃</LogoutIcon>
                        </>
                    ) : (
                        <>
                            <a href="http://localhost:3000/auth/login" style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'white' }}>로그인</Button>
                            </a>
                            <a href="http://localhost:3000/auth/register" style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'white' }}>회원가입</Button>
                            </a>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default ToolBar;