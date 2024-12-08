import React from "react";
import "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { SECRET_KEY } from "../../../utils/constants";
import CryptoJS from "crypto-js";
import CustomInput from "../../../components/input/CustomInput";
import CustomButton from "../../../components/button/CustomButton";
import signupStyles from "../signup/SignupPage.module.css";
import styles from "./LoginPage.module.css";
interface LoginData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  //login
  const handleLogin: SubmitHandler<LoginData> = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { email: string }) => user.email === data.email
    );

    if (!user) {
      setError("email", { type: "custom", message: "Email does not exist" });
      return;
    }

    // Decrypt password
    const bytes = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
    const decPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (decPassword !== data.password) {
      setError("password", { type: "custom", message: "Incorrect password" });
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    toast("Login Successful");
    navigate("/");
  };

  return (
    <section className={styles.loginContainer}>
      <h1 className={signupStyles.heading}>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)} className={signupStyles.form}>
        <CustomInput
          label="Email"
          type="email"
          id="email"
          {...register("email")}
          onChange={(e) => {
            register("email").onChange(e);
            trigger("email");
          }}
          error={errors.email?.message}
          required
        />
        <CustomInput
          label="Password"
          type="password"
          id="password"
          {...register("password")}
          onChange={(e) => {
            register("password").onChange(e);
            trigger("password");
          }}
          error={errors.password?.message}
          required
        />
        <CustomButton
          title="Login"
          type="submit"
          className={styles.loginButton}
          disabled={!isValid}
        />
      </form>
      <p className={styles.signupSection}>
        Don't have an account?
        <Link to={`/signup`} className={signupStyles.link}>
          Create Account
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
