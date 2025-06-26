import { registerSchema } from "@/helpers/validation-schemas";
import { Form, Formik, useFormikContext, type FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  EmailUsernameField,
  PasswordField,
  ValidationField,
} from "@/components/formField";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/Api/auth.api";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { CheckLine, TriangleAlert } from "lucide-react";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

const checkUsernameAvailability = async (username: string) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/validate-username",
      { username }
    );
    return res.data.available;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};

const UsernameWatcher = ({setUsernameError} : any) => {
  const { values } = useFormikContext<RegisterFormValues>();

  const debouncedCheck = useRef(
    debounce(async (username: string) => {
      if (!username || username.length < 3) return;

      const available = await checkUsernameAvailability(username);
      if (!available) {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
    }, 1000)
  ).current;

  useEffect(() => {
    debouncedCheck(values.username);
    return () => debouncedCheck.cancel();
  }, [values.username]);

  return null;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [usernameError, setUsernameError]= useState(false);

  const initialFormValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
  };

  const RegisterMutation = useMutation({
    mutationFn: (credentials: RegisterFormValues) => register(credentials),
    onSuccess: () => navigate("/login"),
    onError: (error: any) => {
      alert(
        "Registration failed: " + error.response?.data?.error || error.message
      );
    },
  });

  const handleSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setSubmitting(false);
    RegisterMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <UsernameWatcher setUsernameError={setUsernameError} />
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 items-center">
              <EmailUsernameField
                label="First Name"
                name="first_name"
                placeholder="John"
              />
              <EmailUsernameField
                label="Last Name"
                name="last_name"
                placeholder="Doe"
              />
            </div>

            <ValidationField
              label="Email"
              name="email"
              placeholder="m@example.com"
            />
            <div>
              <ValidationField
                label="Username"
                name="username"
                placeholder="johndoe_69"
              />
              {values.username.length > 3 && (
                <>
                  {usernameError ? (
                    <div className="flex gap-1 items-center mt-2">
                      <div className="rounded-full bg-red-400 text-white h-4 w-4 flex items-center justify-center">
                        <TriangleAlert className="h-2.5 w-2.5" />{" "}
                      </div>
                      <div className="text-xs text-red-400">
                        Username is already taken.
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center mt-2">
                      <div className="rounded-full bg-green-600 text-white h-4 w-4 flex items-center justify-center">
                        <CheckLine className="h-2.5 w-2.5" />{" "}
                      </div>
                      <div className="text-xs text-green-600">
                        Username is Available.
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <PasswordField label="Password" name="password" />
            <PasswordField label="Confirm Password" name="confirm_password" />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Sign Up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
