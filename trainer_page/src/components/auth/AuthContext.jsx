import React, {useState, useContext, useEffect} from "react";
import {useCookies} from "react-cookie";
import {checkIfUserLogged} from "./api.jsx";

const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);

    useEffect(() => {
    const checkUserAuth = async () => {
        if (cookies.jwt_trainer_auth !== undefined) {
            let logged_user = await checkIfUserLogged();
            setAuthUser(logged_user);
            setIsLoggedIn(true);
        } else if (props.token !== null) {
            let logged_user = await checkIfUserLogged();
            setAuthUser(logged_user);
            setIsLoggedIn(true);
            setCookie('true_effects_token', props.token);
        }
    };
    checkUserAuth()
}, [props.token]);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }
    return(<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>)
}