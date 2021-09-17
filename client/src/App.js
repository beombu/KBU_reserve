import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { Switch,Route } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import MakeTeamPage from "./pages/MakeTeamPage";

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
    </Switch>
    </div>
  );
}

export default App;