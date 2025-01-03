import React,{useEffect} from 'react';
import RegisterForm from "../Components/auth/RegisterForm";
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const {user} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(user && user._id){
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user && user._id) {
    return null;
  }

  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage