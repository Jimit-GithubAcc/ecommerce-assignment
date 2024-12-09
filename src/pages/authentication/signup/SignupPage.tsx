import React from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../../components/input/CustomInput";
import CustomButton from "../../../components/button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./SignupPage.module.css";
import { encryptPassword } from "../../../utils/helper";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword?: string;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name should at least 3 characters")
    .max(30, "First Name should not be more than 30 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name should at least 3 characters")
    .max(30, "Last Name should not be more than 30 characters"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be minimum 8 characters")
    .max(32, "Password can not be greater than 32 characters long")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[a-z]/, "Must contain one lowercase letter")
    .matches(/\d/, "Must contain one number")
    .matches(/[@$!%*?&]/, "Must contain one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Both passwords must match"),
});

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isValid },
    trigger,
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // signup
  const handleSignup: SubmitHandler<SignupData> = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check for email already exists
    if (users.find((user: { email: string }) => user.email === data.email)) {
      setError("email", { type: "custom", message: "Email already exists" });
      return;
    }

    //encrypt password
    const encPassword = encryptPassword(data.password);

    const newUser = {
      ...data,
      password: encPassword,
      confirmPassword: encPassword,
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("loggedIn", "true");
    toast("Signup Successful");
    navigate("/");
  };
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Signup</h1>
      <form onSubmit={handleSubmit(handleSignup)} className={styles.form}>
        <CustomInput
          label="First Name"
          type="text"
          id="firstName"
          {...register("firstName")}
          onChange={(e) => {
            register("firstName").onChange(e);
            trigger("firstName");
          }}
          error={errors.firstName?.message}
          required
        />
        <CustomInput
          label="Last Name"
          type="text"
          id="lastName"
          {...register("lastName")}
          onChange={(e) => {
            register("lastName").onChange(e);
            trigger("lastName");
          }}
          error={errors.lastName?.message}
          required
        />
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
          label="Mobile Number"
          type="tel"
          id="mobileNumber"
          {...register("mobileNumber")}
          onChange={(e) => {
            register("mobileNumber").onChange(e);
            trigger("mobileNumber");
          }}
          error={errors.mobileNumber?.message}
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
        <CustomInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          onChange={(e) => {
            register("confirmPassword").onChange(e);
            trigger("confirmPassword");
          }}
          error={errors.confirmPassword?.message}
          required
        />
        <CustomButton
          className=""
          title="Sign Up"
          type="submit"
          disabled={!isValid}
        />
      </form>
      <p className={styles.loginSection}>
        Already have an account?
        <Link to={`/login`} className={styles.link}>
          Login
        </Link>
      </p>
    </section>
  );
};

export default SignupPage;
