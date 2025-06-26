import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

export const loginSchema = Yup.object<FormValues>().shape({
  email: Yup.string()
    .required("Email or username is required")
    .test(
      "email-or-username",
      "Please enter a valid email or username",
      (value) => {
        // Simple validation for email or username
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
        const usernameValid = /^[a-zA-Z0-9_]+$/.test(value || "");
        return emailValid || usernameValid;
      }
    ),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  first_name: Yup.string()
    .required("First Name is Required")
    .min(3, "First Name should be at least 3 characters long"),
  last_name: Yup.string()
    .required("Last Name is Required")
    .min(3, "Last Name should be at least 3 characters long"),
  username: Yup.string()
    .required("Username is Required")
    .min(3, "Username should be at least 3 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
  confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});