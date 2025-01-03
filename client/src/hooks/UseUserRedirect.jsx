import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useRedirect = (redirect) => {
  const { user, loading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      navigate(redirect);
    }

    // watch for changes to user, redirect, navigate
  }, [user, redirect, navigate]);
};

export default useRedirect;