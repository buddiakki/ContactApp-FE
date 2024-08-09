import React, { useState } from "react";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();
  const [errorMessage ,setErrorMessage] = useState();
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Log In Failed',
      description:
        `${errorMessage}`,
    });
  };

  const openNotificationWithIconSuccess = (type) => {
    api[type]({
      message: 'Log In Successfull',
      description:
        'User Logged in successfully',
    });
  };

  const handleChange = (evt) => {
    
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.accessToken;
        const UserNmae = data.username
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("UserNmae",UserNmae)
        setState({
          ...state,
          email: "",
          password: "",
        });
        openNotificationWithIconSuccess('success');
        navigate('/Home')
        // alert("Login successful!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error)
        openNotificationWithIcon('error');
        // alert(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="form-container sign-in-container">
      {contextHolder}
      <form >
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required 
        />
        <button onClick={handleOnSubmit}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
