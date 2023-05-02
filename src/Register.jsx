import React, { useState } from "react";

import "./styles/Register.css";
import { useForm } from "react-hook-form";
import textura from "./images/texture.png";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./modules/firebase";
import { collection, addDoc } from "firebase/firestore";

export function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (data.password == data.password2) {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await uploadData(data);
    } else {
      alert("No coinciden las contraseñas");
    }
  };

  async function uploadData(data) {
    const newsCollection = collection(db, "users");
    await addDoc(newsCollection, {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      photo: "data.url",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className="app">
      <div className="content-register" id="content">
        <div className="register-box" id="register-content">
          <div className="texture-register">
            <img src={textura} alt="" />
          </div>
          <form
            id="register"
            className="register-content"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3>Crea tu cuenta</h3>
            <div className="upload-photo">
              <div className="circle" id="add">
                <a id="upload">+</a>
              </div>
              <input type="file" id="photo" hidden />
              <h4>Foto de perfil</h4>
            </div>
            <div className="input-box">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name-register"
                required
                {...register("name")}
              />
            </div>
            <div className="input-box">
              <label htmlFor="lastname">Apellido</label>
              <input
                type="text"
                id="lastname-register"
                required
                {...register("lastname")}
              />
            </div>
            <div className="input-box">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email-register"
                required
                {...register("email")}
              />
            </div>
            <div className="input-box">
              <label htmlFor="">Contraseña</label>
              <input
                type="password"
                id="password-register"
                required
                {...register("password")}
              />
              <a id="showPassword">
                <i id="icon" className="fa-solid fa-eye"></i>
              </a>
            </div>
            <div className="input-box">
              <label htmlFor="password-check">Repetir Contraseña</label>
              <input
                type="password"
                id="password-check"
                required
                {...register("password2")}
              />
              <a id="showPasswordcheck">
                <i id="iconCheck" className="fa-solid fa-eye"></i>
              </a>
            </div>
            <div className="buttoms">
              <a id="back">
                <span>
                  <i className="fa-solid fa-arrow-left"></i>
                </span>
                Back
              </a>
              <input id="btn-register" type="submit" value="Registrarse" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
