import PublicLayout from '@/layout/public-layout';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom';
import ForgotPassword from '../pages/auth/forgot-password';
import ResetPassword from '../pages/auth/reset-password';

const PublicRoutes = () => {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <PublicLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </PublicLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        </PublicLayout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <PublicLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassword />
          </Suspense>
        </PublicLayout>
      ),
    },
    {
      path: "/reset-password/:token",
      element: (
        <PublicLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        </PublicLayout>
      ),
    },
  ]);
  return routes;
};

export default PublicRoutes
