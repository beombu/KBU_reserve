import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";//해당 url로 이동시켜주는 API
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const ToolBar = () => {
    const [me, setMe] = useContext(AuthContext);
    const history = useHistory();
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
            history.push('/');

        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ background: '#00e676' }} position="static">
                <Toolbar>
                    <Link to="/">
                        <HomeIcon style={{ color: '#757575' }} fontSize="large" sx={{ mr: 2 }} />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        KBU Sports
                    </Typography>

                    {me ? (
                        <>
                            <Button
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                마이페이지
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <Link to="/mypage/getteamlist">
                                <MenuItem>팀모집</MenuItem>
                                </Link>
                            </Menu>
                            <LogoutIcon onClick={logoutHandler} style={{ color: '#757575' }}>로그아웃</LogoutIcon>

                        </>
                    ) : (
                        <>
                            <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                                <Button style={{ color: '#757575' }}>로그인</Button>
                            </Link>
                            <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                                <Button style={{ color: '#757575' }}>회원가입</Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default ToolBar;

