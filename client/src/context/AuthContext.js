import React, { createContext , useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState();
    console.log("Authcontext는 이때 실행" );

    useEffect(() => {
        const sessionId = localStorage.getItem("sessionId");
        if (me) {
            axios.defaults.headers.common.sessionid = me.sessionId;
            localStorage.setItem("sessionId", me.sessionId);
            console.log("AuthContext의 useeffect실행1");

        } else if (sessionId) {
            axios.get("/users/me", { headers: { sessionid: sessionId } })
                .then(result =>{
                    console.log("AuthContext의 useeffect실행2");
            
                    setMe({
                        name: result.data.name,
                        userId: result.data.userId,
                        sessionId: result.data.sessionId,
                    })
                })
                .catch((err) =>{
                    console.error(err);
                    localStorage.removeItem("sessionId");
                    delete axios.defaults.headers.common.sessionid;
                    console.log("AuthContext의 useeffect실행3");
                });
        } else{
            delete axios.defaults.headers.common.sessionid;
            console.log("너는 언제 실행하니?");
        } 

    }, [me]);

    
    return (
        <AuthContext.Provider value={[me, setMe]}>{children}</AuthContext.Provider>
    );
};