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
import IncludeTeamPage from "./pages/IncludeTeamPage"
import FootBallPage from "./pages/FootballPage"
import BasketBallPage from "./pages/BasketBallPage"
import PingPongPage from "./pages/PingPongPage"

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
      <Route path= "/mypage/includeteampage" exact component ={ IncludeTeamPage }/>
      <Route path= "/introduce/Football" exact component={FootBallPage}/>
      <Route path= "/introduce/BasketBallPage" exact component={BasketBallPage}/>
      <Route path= "/introduce/PingPongPage" exact component={PingPongPage}/>
    </Switch>
    </div>
  );
}

export default App;
