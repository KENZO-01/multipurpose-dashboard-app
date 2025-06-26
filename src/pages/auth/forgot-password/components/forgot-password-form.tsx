import { requestPasswordReset } from '@/Api/auth.api';
import { EmailUsernameField } from '@/components/formField';
import { Button } from '@/components/ui/button';
import { forgotPasswordSchema } from '@/helpers/validation-schemas';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useState } from 'react';
import { Loader2Icon } from "lucide-react";

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordForm = () => {

    const [isEmailSent, setIsEmailSent] = useState(false);

    const forgotPasswordMutation = useMutation({
      mutationFn: (credentials: ForgotPasswordFormValues) =>
        requestPasswordReset(credentials.email),
      onSuccess: () => {
        setIsEmailSent(true);
      },
      onError: (error: any) => {
        console.error("Password reset request failed:", error);
        alert(
          `Password reset request failed: ${
            error.response?.data?.error || error.message
          }`
        );
      }
    });

  const handleSubmit = (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    setSubmitting(true);
    forgotPasswordMutation.mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  if(isEmailSent) {
    return (
      <div className='border border-gray-300 border-dashed rounded-2xl p-4 text-sm text-slate-700'>
        A password reset email has been sent to the email address you provided. Please follow the instructions in the email to initiate the password reset process.
      </div>
    )
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <EmailUsernameField
                label="Email"
                name="email"
                placeholder="m@example.com"
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2Icon className="animate-spin" />}
                Continue
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm
