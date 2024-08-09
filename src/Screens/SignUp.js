import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMessage ,setErrorMessage] = useState();
  const [api, contextHolder] = notification.useNotification();

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const openNotificationWithIconSuccess = (type) => {
    api[type]({
      message: 'sign Up Successfull',
      description:
        'User Logged in successfully',
    });
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Sign Up Failed',
      description:
        `${errorMessage}`,
    });
  };

  const handleOnSubmit = async(evt) => {
    evt.preventDefault();

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    if (!name.trim() || !email.trim() ||!password.trim() ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ email, password, username: name }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log(data,'data')
        // const accessToken = data.user.accessToken;
        const UserNmae = data.user.username;
        // localStorage.setItem("accessToken", accessToken);
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
    <div className="form-container sign-up-container">
       {contextHolder}
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        {/* <span>or use your email for registration</span> */}
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button onClick={handleOnSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
