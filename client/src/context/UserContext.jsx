import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const serverUrl = "http://localhost:8000";

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      setUserState({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      console.log("Error registering user", error.response?.data.message);
      toast.error(error.response.data.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Input validation
    if (!userState.email || !userState.password) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }
  
    if (!userState.email.includes('@')) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }
  
    try {
      // Add explicit headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      };
  
      // Debug log before request
      console.log('Attempting login for:', userState.email);
  
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        config
      );
  
      // Debug log after successful response
      console.log('Login response status:', res.status);
  
      if (res.data) {
        toast.success("Login successful!");
        
        // Clear sensitive data
        setUserState({
          email: "",
          password: "",
        });
  
        // Get user details
        await getUser();
        
        navigate("/");
      }
    } catch (error) {
      // Enhanced error logging
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      const statusCode = error.response?.status;
      
      console.error('Login error:', {
        status: statusCode,
        message: errorMessage,
        details: error.response?.data
      });
  
      // Specific error messages based on status code
      if (statusCode === 401) {
        toast.error("Invalid email or password");
      } else if (statusCode === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const userLoginStatus = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
  
      const loggedIn = !!res.data;
      
      if (!loggedIn) {
        console.log('User not logged in, redirecting to login page');
        navigate("/login");
      }
      
      return loggedIn;
    } catch (error) {
      console.error("Login status check failed:", {
        status: error.response?.status,
        message: error.response?.data?.message
      });
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        navigate("/login");
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add request interceptor
axios.interceptors.request.use((config) => {
  // Add default headers
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle expired sessions
    if (error.response?.status === 401) {
      // Clear any stored user data
      setUser({});
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success("User logged out successfully");

      setUser({});

      // redirect to login page
      navigate("/login");
    } catch (error) {
      console.log("Error logging out user", error.response?.data.message);
      toast.error(error.response.data.message);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true, // send cookies to the server
      });

      setUser((prevState) => ({
        ...prevState,
        ...res.data,
      }));

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error.response?.data.message);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true, // send cookies to the server
      });

      // update the user state
      setUser((prevState) => ({
        ...prevState,
        ...res.data,
      }));

      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-email`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Email verification sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending email verification", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User verified successfully");

      // refresh the user details
      getUser();

      setLoading(false);
      // redirect to home page
      navigate("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const forgotPasswordEmail = async (email) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Forgot password email sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password changed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password reset successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/admin/users`, {
        withCredentials: true, // send cookies to the server
      });

      setAllUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${serverUrl}/api/v1/admin/users/${id}`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success("User deleted successfully");
      setLoading(false);
      // refresh the users list
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        await getUser();
      }
    };

    loginStatusGetUser();
  }, []);

  useEffect(() => {
    if (user.role === "admin") {
      getAllUsers();
    }
  }, [user.role]);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        updateUser,
        emailVerification,
        verifyUser,
        forgotPasswordEmail,
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
