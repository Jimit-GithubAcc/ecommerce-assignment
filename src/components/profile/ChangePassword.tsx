import React from "react";
import CustomButton from "../button/CustomButton";
import styles from "../../pages/profile/ProfilePage.module.css";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { PasswordForm } from "../../pages/profile/ProfilePage";
import CustomInput from "../input/CustomInput";

interface ChangePasswordProps {
  passwordErrors: FieldErrors<PasswordForm>;
  isPasswordValid: boolean;
  handlePasswordSubmit: UseFormHandleSubmit<PasswordForm, undefined>;
  onChangePassword: (data: PasswordForm) => void;
  passwordRegister: UseFormRegister<PasswordForm>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  passwordErrors,
  isPasswordValid,
  handlePasswordSubmit,
  onChangePassword,
  passwordRegister,
}) => {
  return (
    <form
      onSubmit={handlePasswordSubmit(onChangePassword)}
      className={styles.form}
    >
      <div className={styles.formGroup}>
        <CustomInput
          label="Current Password"
          type="password"
          {...passwordRegister("currentPassword")}
          error={passwordErrors.currentPassword?.message}
        />
      </div>

      <div className={styles.formGroup}>
        <CustomInput
          label="New Password"
          type="password"
          {...passwordRegister("newPassword")}
          error={passwordErrors.newPassword?.message}
        />
      </div>

      <div className={styles.formGroup}>
        <CustomInput
          label="Confirm New Password"
          type="password"
          {...passwordRegister("confirmNewPassword")}
          error={passwordErrors.confirmNewPassword?.message}
        />
      </div>

      <CustomButton
        type="submit"
        title="Change Password"
        className={styles.button}
        disabled={!isPasswordValid}
      />
    </form>
  );
};

export default ChangePassword;
