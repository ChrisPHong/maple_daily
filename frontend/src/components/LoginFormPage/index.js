import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="top-container flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-center items-center border border-black border-1 rounded p-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-l font-bold mb-2">Log In</h1>
        <ul>
          {errors.map((error, idx) => (
            <li className="text-red-500 font-bold" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <div className="flex flex-row justify-center items-start">
          <input
            className="border-black border rounded p-1 mb-2 font-sans"
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row justify-center items-start">
          <input
            className="border-black border rounded p-1 mb-2 font-sans"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
