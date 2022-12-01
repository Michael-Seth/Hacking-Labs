import React, { useContext, useState } from "react";
import dashboardImg from "../assets/img/newdashboardcrop.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import logo from "../assets/img/cysecnewlogo.png";
import { auth } from "./Firebase";
import "./auth.css";
import GlobalContext from "../context/GlobalContext";

function Login() {
  const { adminUser } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Wrong User Credentials");
    }
  };

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (adminUser) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <>
      <div className="container">
        <div className="container-item-a">
          <div className="logo">
            <img src={logo} alt="" onClick={() => navigate("/")} />
          </div>
          <div className="wrapper">
            <h2>
              Sign <span style={{ color: "#0cbc8b" }}>In</span>
            </h2>
            <div className="wrapper-box">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    placeholder="Enter your email address"
                    type="email"
                    required
                    id="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    placeholder="Enter your password"
                    required
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className="agreement">
                  <input type="checkbox" />
                  <label>Remember me</label>
                </div>
                <button className="btn btn-d">SIGN IN</button>
              </form>
              <h5 style={{ textAlign: "center" }}>Or</h5>
              <button
                className="g-btn hvr-sweep-to-right"
                onClick={signInWithGoogle}
              >
                SIGN IN WITH GOOGLE
              </button>
              <div className="reset">
                <p>
                  Forget password?{" "}
                  <Link to="/forgot">
                    <span style={{ color: "#0cbc8b" }}>&nbsp; Reset</span>
                  </Link>
                </p>
                <p>
                  Sign Up
                  <Link to="/register">
                    {" "}
                    <span style={{ color: "#0cbc8b" }}>&nbsp; Here!</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-item-b">
          <div className="bg-img">
            <div className="textBox">
              <h3>Welcome Back</h3>
              <p>
                Discover, learn and create real world hacking solutions. Your
                road map to becoming a cyber security engineer
              </p>
            </div>
            <img src={dashboardImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
