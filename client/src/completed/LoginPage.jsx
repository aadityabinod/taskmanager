import React, {useEffect} from "react";
import LoginForm from "../Components/auth/LoginForm";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(user && user._id){
            navigate("/");
        }
    },[user, history]);

    if(user && user._id){
        return null;
    }

    return (
        <div className="auth-page w-full h-full flex justify-center items-center">
          <LoginForm />
        </div>
      );
    }
    
    export default Page;