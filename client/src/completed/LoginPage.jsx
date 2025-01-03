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
  },[user, navigate]);

  if(user && user._id){
    return null;
  }

  return (
    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <LoginForm />
    </div>
    );
  }
  
  export default LoginPage;