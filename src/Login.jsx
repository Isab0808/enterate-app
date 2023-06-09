import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./modules/firebase.js";

import "./styles/Login.css";
import { BsGoogle } from "react-icons/bs";

import logoLogin from "./images/logo-login.png";

import { Register } from "./Register";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log("Google Sign In Successful");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const submit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Usuario no encontrado");
      console.log(error);
    }
  };

  return (
    <div>
      {showRegister ? (
        <Register />
      ) : (
        <div className="app">
          <div className="content-login" id="content">
            <div className="login-box" id="login-content">
              <div className="logo">
                <img src={logoLogin} alt="Entérate Diario Logo" />
              </div>
              <div className="auth-box" id="Email-auth">
                <div className="input-box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    required
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </div>
                <button id="btn" type="submit" onClick={submit}>
                  Iniciar sesion
                </button>
                <a href="#">¿Olvidaste tu contraseña?</a>
                <div id="divider"></div>
              </div>
              <div className="authentication">
                <h3>Ingresa con</h3>
                <div className="btn-auth">
                  <button
                    className="btn"
                    id="Google-auth"
                    type="submit"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    <BsGoogle size={25} />
                  </button>
                </div>
                <span>
                  ¿No tienes cuenta?{" "}
                  <a id="register" onClick={handleRegisterClick}>
                    Registrate
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
