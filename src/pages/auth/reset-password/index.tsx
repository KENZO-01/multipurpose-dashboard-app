import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from './components/reset-password-form';


const ResetPassword = () => {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-base tracking-tight">
          Two-factor Authentication
        </CardTitle>
        <CardDescription>
          Please enter the authentication code. <br /> We have sent the
          authentication code to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground px-8 text-center text-sm">
          Haven't received it?{" "}
          <Link
            to="/register"
            className="hover:text-primary underline underline-offset-4"
          >
            Resend a new code.
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}

export default ResetPassword;