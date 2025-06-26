import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  successMsg?: string;
}

export const PasswordField: React.FC<FieldProps> = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-3">
      <Label htmlFor={props.name}>{label}</Label>
      <div className="relative">
        <Field
          as={Input}
          type={showPassword ? "text" : "password"}
          placeholder="********"
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};


// Email/Username Component
export const EmailUsernameField: React.FC<FieldProps> = ({ label, ...props }) => (
  <div className="grid gap-3">
    <Label htmlFor={props.name}>{label}</Label>
    <Field as={Input} {...props} />
    <ErrorMessage
      name={props.name}
      component="div"
      className="text-red-500 text-xs"
    />
  </div>
);


export const ValidationField: React.FC<FieldProps> = ({
  label,
  successMsg,
  ...props
}) => (
  <div className="grid gap-3">
    <Label htmlFor={props.name}>{label}</Label>
    <Field as={Input} {...props} />
    <ErrorMessage
      name={props.name}
      component="div"
      className="text-red-500 text-xs"
    />
    {successMsg && <div className="text-green-700 text-sm ">{successMsg}</div>}
  </div>
);