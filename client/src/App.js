import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { Switch,Route } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import MakeTeamPage from "./pages/MakeTeamPage";
import GetTeamList from "./pages/GetTeamList";
import ModifyMakeTeam from "./pages/ModifyMakeTeam";
import Participate from "./pages/Participate";
import IncludeTeamPage from "./pages/IncludeTeamPage"

const App = () => {
  return (
    <div style={{ maxWidth:600, margin: "auto"}}>
    <ToastContainer />
    <ToolBar />
    <Switch>
      <Route path= "/" exact component = { MainPage} />
      <Route path= "/auth/register" exact component = { RegisterPage} />
      <Route path= "/auth/login" exact component = { LoginPage} />
      <Route path= "/makeTeam" exact component = { MakeTeamPage } />
      <Route path= "/mypage/getteamlist" exact component = { GetTeamList } />
      <Route path= "/makeTeam/modify/:data" exact component ={ ModifyMakeTeam }/>
      <Route path= "/participate" exact component ={ Participate }/>
      <Route path= "/mypage/includeteampage" exact component ={ IncludeTeamPage }/>
    </Switch>
    </div>
  );
}

export default App;
