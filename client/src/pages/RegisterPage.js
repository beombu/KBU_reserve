import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify"
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import CustomSelect from "../components/CustomSelect";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const sexAarry = ["성별선택", "남", "여"];
    const [selectedSex, setSelectedSex] = useState("");
    const majorArray = ["학과선택", "성서학과", "사회복지학과", "영유아보육학과", "컴퓨터소프트웨어학과", "간호학과"];
    const [selectedMajor, setSelectedMajor] = useState("");
    const [kbuCode, setkbuCode] = useState("");
    const [, setMe] = useContext(AuthContext);
    const history = useHistory();



    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            if (username.length < 3) throw new Error("이름이 너무 짧아요!");
            if (password.length < 6) throw new Error("비밀번호는 6자리 이상 해주세요!");
            if (password !== passwordCheck) throw new Error("비밀번호가 달라요!");
            if (phoneNumber.length !== 11) throw new Error("전화번호를 확인해주세요!");
            if (selectedSex === "성별선택") throw new Error("성별을 선택하세요!");
            if (selectedMajor === "학과선택") throw new Error("학과를 선택하세요!");
            if (kbuCode.length !== 9) throw new Error("학번을 확인해주세요!");
            //정규표현식으로 검사할 수 있으면 검사할것~!
            //검사는 client에서 검사해야한 건지 알아볼것
            const result = await axios.post("/users/register", { name, username, password, email, phoneNumber, selectedSex, selectedMajor, kbuCode });
            setMe({ userId: result.data.userId, sessionId: result.data.sessionId, name: result.data.name, });
            toast.success("회원가입 성공");
            history.push("/");
        } catch (err) {
            console.error(err);
            toast.error(err.message);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <CustomInput label="이름" value={name} setValue={setName} />
                        <CustomInput label="회원ID" value={username} setValue={setUsername} />
                        <CustomInput label="비밀번호" value={password} type="password" setValue={setPassword} />
                        <CustomInput label="비밀번호확인" value={passwordCheck} type="password" setValue={setPasswordCheck} />
                        <CustomInput label="이메일" value={email} setValue={setEmail} />
                        <CustomInput label="전화번호(ex:01012345678)" value={phoneNumber} setValue={setPhoneNumber} />
                        <CustomSelect label="성별" value={selectedSex} selectArray={sexAarry} setValue={setSelectedSex} />
                        <CustomSelect label="학과" value={selectedMajor} selectArray={majorArray} setValue={setSelectedMajor} />
                        <CustomInput label="학번" value={kbuCode} setValue={setkbuCode} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            회원가입
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/auth/login" variant="body2">
                                    {"로그인"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>

    );
};

export default RegisterPage;

