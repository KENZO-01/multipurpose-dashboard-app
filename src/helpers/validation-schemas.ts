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
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});