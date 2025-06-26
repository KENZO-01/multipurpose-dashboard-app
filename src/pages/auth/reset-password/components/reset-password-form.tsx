import { resetPassword } from "@/Api/auth.api";
import { PasswordField } from "@/components/formField";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema } from "@/helpers/validation-schemas";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik, type FormikHelpers } from "formik";
import { Loader2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ResetPasswordFormFields {
  password: string;
  confirm_password: string;
}

const ResetPasswordForm = () => {

   const { token } = useParams();

  const navigate = useNavigate();

  const forgotPasswordMutation = useMutation({
    mutationFn: (credentials: any) =>
      resetPassword(credentials.password, credentials.token),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Password reset request failed:", error);
      alert(
        `Password reset request failed: ${
          error.response?.data?.error || error.message
        }`
      );
    },
  });

  const handleSubmit = (
    values: ResetPasswordFormFields,
    { setSubmitting }: FormikHelpers<ResetPasswordFormFields>
  ) => {
    setSubmitting(true);
    const payload = {
      password: values.password,
      token: token,
    };
    forgotPasswordMutation.mutate(payload, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <Formik
      initialValues={{ password: "", confirm_password: "" }}
      validationSchema={resetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <PasswordField label="Password" name="password" />
              <PasswordField label="Confirm Password" name="confirm_password" />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2Icon className="animate-spin" />}
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
