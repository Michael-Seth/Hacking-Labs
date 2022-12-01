import React, { useState } from "react";
import dashboardImg from "../assets/img/newdashboardcrop.png";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import logo from "../assets/img/cysecnewlogo.png";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./Firebase";
import "./auth.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;

        updateProfile(auth.currentUser, {
          displayName: username,
        });
        await sendEmailVerification(auth.currentUser).then(() => {
          toast.success("Email Verification Sent...");
        });

        setTimeout(() => {
          navigate("/dashboard/home");
        }, 1000);
        const formDataCopy = { ...formData };
        // delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, "users", user.uid), formDataCopy);
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong with your registration");
      }
    }
  };

  // Login with Goooglr
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
        toast.error("Something went wrong with your registration");
      });
  };
  return (
    <>
      <div className="container">
        <div className="container-item-a">
          <div className="logo">
            <img src={logo} alt="" onClick={() => navigate("/")} />
          </div>
          <div className="wrapper">
            <h2>
              Create An <span style={{ color: "#0cbc8b" }}>Account</span>
            </h2>
            <div className="wrapper-box">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Username</label>
                  <input
                    placeholder="Enter your Username"
                    type="text"
                    required
                    name="username"
                    id="username"
                    value={username}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Email</label>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    placeholder="Enter your password"
                    required
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    placeholder="Enter your password"
                    required
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                  />
                </div>
                <div className="agreement">
                  <input type="checkbox" name="agree" />
                  <label htmlFor="agree">I accept the Terms of Service</label>
                </div>
                <button className="btn btn-d">SIGN UP</button>
              </form>
              <h5 style={{ textAlign: "center" }}>Or</h5>
              <button
                onClick={signInWithGoogle}
                className="g-btn hvr-sweep-to-right"
              >
                SIGN UP WITH GOOGLE
              </button>
              <div className="reset">
                <p>
                  Already have an account?{" "}
                  <Link to="/login">
                    <span style={{ color: "#0cbc8b" }}>&nbsp; Sign In</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-item-b">
          <div className="bg-img">
            <div className="textBox">
              <h3>Start Your Journey With Us</h3>
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

export default Register;
