import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="Submit-container flex flex-row justify-center items-center border border-black border-1 rounded max-w-4xl">
      <img
        alt="maple_pic"
        className="w-96"
        src="https://www.pngitem.com/pimgs/m/435-4351583_maplestory-logo-maple-story-logo-hd-png-download.png"
      />
      <form
        className="flex flex-col justify-center items-center border-l border-black border-1 m-2 py-8 px-1"
        onSubmit={handleSubmit}
      >
        <h1 className="text-l font-bold mb-2">Create Account</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="flex flex-row justify-center items-start">
          <input
            className="border-black border rounded p-1 mb-2 font-sans"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-center items-start">
          <input
            className="border-black border rounded p-1 mb-2 font-sans"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-center items-start">
          <input
            className="border-black border rounded p-1 mb-2 font-sans"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-center ">
          <input
            className="border-black border rounded p-1 mb-2 font-sans"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-center items-start"> </div>

        <button className="submit-btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
