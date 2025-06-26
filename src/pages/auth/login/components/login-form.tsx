import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";

import { loginSchema } from "@/helpers/validation-schemas";
import { EmailUsernameField, PasswordField } from "@/components/formField";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/Api/auth.api";
import { setUserData, setUserTokens } from "@/Store/user/user-reducer";

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormValues) => login(credentials),
    onSuccess: (user) => {
      dispatch(setUserData(user?.user));
      dispatch(setUserTokens(user.tokens));
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      alert("Login failed: " + error.response?.data?.error || error.message);
    },
  });

  const handleSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(false);
    loginMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <EmailUsernameField
                label="Email or Username"
                name="email"
                placeholder="m@example.com or username"
              />
              <div>
                <PasswordField label="Password" name="password" />
                <Link
                  to="/forgot-password"
                  className="text-slate-600 text-xs pt-2 float-right"
                >
                  forgot password
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Login
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
