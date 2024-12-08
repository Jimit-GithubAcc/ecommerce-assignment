/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { decryptPassword, encryptPassword } from "../../utils/helper";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditProfile from "../../components/profile/EditProfile";
import ChangePassword from "../../components/profile/ChangePassword";

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password?: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [userData, setUserData] = useState<ProfileForm | null>(null);
  const storedUserData = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const navigate = useNavigate();

  const profileSchema = yup.object().shape({
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
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    mobileNumber: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
  });

  const passwordSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be minimum 8 characters")
      .max(32, "Password can not be greater than 32 characters long")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[a-z]/, "Must contain one lowercase letter")
      .matches(/\d/, "Must contain one number")
      .matches(/[@$!%*?&]/, "Must contain one special character"),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "New Password should be minimum 8 characters")
      .max(32, "New Password can not be greater than 32 characters long")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[a-z]/, "Must contain one lowercase letter")
      .matches(/\d/, "Must contain one number")
      .matches(/[@$!%*?&]/, "Must contain one special character"),
    confirmNewPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword")],
        "Both new password and confirm password must match"
      ),
  });

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    setError: setProfileError,
    setValue: setProfileValue,
    formState: { errors: profileErrors, isValid: isProfileValid },
  } = useForm<ProfileForm>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    setError: setPasswordError,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = useForm<PasswordForm>({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (storedUserData) {
      setUserData(storedUserData);
      Object.keys(storedUserData).forEach((key) => {
        setProfileValue(key as keyof ProfileForm, storedUserData[key]);
      });
    }
  }, []);

  const onEditProfile = (data: ProfileForm) => {
    const filterUsers = storedUsers.filter(
      (user: { email: string }) => user.email !== data.email
    );
    const emailExists = filterUsers.find(
      (user: { email: string }) => user.email === data.email
    );

    if (emailExists) {
      setProfileError("email", {
        type: "custom",
        message: "This email is already registered!",
      });
      return;
    }

    const currentUserIndex = storedUsers.findIndex(
      (user: { email: string }) => user.email === data.email
    );

    if (currentUserIndex === -1) {
      alert("User not found!");
      return;
    }

    // Update the current user's data in the users array
    storedUsers[currentUserIndex] = {
      ...storedUsers[currentUserIndex],
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobileNumber: data.mobileNumber,
    };

    // Update the currentUser data in localStorage to reflect the changes
    localStorage.setItem("users", JSON.stringify(storedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify(storedUsers[currentUserIndex])
    );
    setUserData(data);
    toast.success("Profile updated successfully!");
    navigate("/");
  };

  // find user and check and save passowrd
  const onChangePassword = (data: PasswordForm) => {
    const currentUser = storedUsers.find(
      (user: any) => user.email === userData?.email
    );

    if (!currentUser) {
      alert("User not found!");
      return;
    }

    const storedPassword = decryptPassword(currentUser.password);

    if (data.currentPassword !== storedPassword) {
      setPasswordError("currentPassword", {
        type: "custom",
        message: "Current password is incorrect!",
      });
      return;
    }

    if (data.currentPassword === data.newPassword) {
      setPasswordError("newPassword", {
        type: "custom",
        message: "New password should be different from current password!",
      });
      return;
    }

    const encryptedNewPassword = encryptPassword(data.newPassword);
    currentUser.password = encryptedNewPassword;
    currentUser.confirmPassword = encryptedNewPassword;

    localStorage.setItem("users", JSON.stringify(storedUsers));
    toast.success("Password updated successfully!");
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <h1>My Profile</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "editProfile" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("editProfile")}
        >
          Edit Profile
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "changePassword" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("changePassword")}
        >
          Change Password
        </button>
      </div>

      {activeTab === "editProfile" && (
        <EditProfile
          profileErrors={profileErrors}
          isProfileValid={isProfileValid}
          handleProfileSubmit={handleProfileSubmit}
          onEditProfile={onEditProfile}
          profileRegister={profileRegister}
        />
      )}

      {activeTab === "changePassword" && (
        <ChangePassword
          handlePasswordSubmit={handlePasswordSubmit}
          isPasswordValid={isPasswordValid}
          onChangePassword={onChangePassword}
          passwordErrors={passwordErrors}
          passwordRegister={passwordRegister}
        />
      )}
    </section>
  );
};

export default ProfilePage;
