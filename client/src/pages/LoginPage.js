import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import {toast} from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          KBU_Sports
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

const LoginPage =() =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, setMe] = useContext(AuthContext);
    const history = useHistory()

    const loginHandler = async(e) => {
        
        try{
            e.preventDefault();
            const result = await axios.patch("/users/login",{username, password});
            setMe({name: result.data.name, sessionId : result.data.sessionId, userId : result.data.userId});
            toast.success("로그인");
            history.push("/");
        }catch (err){
          console.error(err);
          toast.error(err.response.data.message);
        }

    }

    return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'green' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{fontFamily:"NanumSquare", color: 'green', fontWeight: 700}}>
            로그인
          </Typography>
          <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
            <CustomInput label= "회원ID" value = {username} setValue={setUsername} autoFocus />
            <CustomInput label ="비밀번호" value = {password} setValue={setPassword} type="password"/>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              style = {{paddingRight: '1px'}}
              label="아이디 저장"
            />
            <Button
            color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/auth/register" variant="body2">
                  {"아이디가 없으신가요?(회원가입)"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )
};

export default LoginPage;

