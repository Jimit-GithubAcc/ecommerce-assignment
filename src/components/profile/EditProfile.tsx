import React from "react";
import styles from "../../pages/profile/ProfilePage.module.css";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { ProfileForm } from "../../pages/profile/ProfilePage";
import CustomInput from "../input/CustomInput";

interface EditProfileProps {
  isProfileValid: boolean;
  profileErrors: FieldErrors<ProfileForm>;
  handleProfileSubmit: (
    onValid: SubmitHandler<ProfileForm>,
    onInvalid?: SubmitErrorHandler<ProfileForm> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onEditProfile: (data: ProfileForm) => void;
  profileRegister: UseFormRegister<ProfileForm>;
}

const EditProfile: React.FC<EditProfileProps> = ({
  profileErrors,
  isProfileValid,
  handleProfileSubmit,
  onEditProfile,
  profileRegister,
}) => {
  return (
    <form onSubmit={handleProfileSubmit(onEditProfile)} className={styles.form}>
      <div className={styles.formGroup}>
        <CustomInput
          label="First Name"
          {...profileRegister("firstName")}
          error={profileErrors.firstName?.message}
        />
      </div>

      <div className={styles.formGroup}>
        <CustomInput
          label="Last Name"
          {...profileRegister("lastName")}
          error={profileErrors.lastName?.message}
        />
      </div>

      <div className={styles.formGroup}>
        <CustomInput
          label="Email"
          type="email"
          {...profileRegister("email")}
          error={profileErrors.email?.message}
        />
      </div>

      <div className={styles.formGroup}>
        <CustomInput
          label="Mobile Number"
          type="tel"
          {...profileRegister("mobileNumber")}
          error={profileErrors.mobileNumber?.message}
        />
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={!isProfileValid}
      >
        Edit Profile
      </button>
    </form>
  );
};

export default EditProfile;
