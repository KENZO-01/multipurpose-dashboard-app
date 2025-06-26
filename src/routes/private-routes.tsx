import PrivateLayout from '@/layout/private-layout';
import Dashboard from '@/pages/dashboard';
import Overview from '@/pages/overview';
import Projects from '@/pages/projects';
import CreateProject from '@/pages/projects/Create';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const PrivateRoutes = () => {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: (
        <PrivateLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        </PrivateLayout>
      ),
    },
    {
      path: "/overview",
      element: (
        <PrivateLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Overview />
          </Suspense>
        </PrivateLayout>
      ),
    },
    {
      path: "/projects",
      element: (
        <PrivateLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Projects />
          </Suspense>
        </PrivateLayout>
      ),
    },
    {
      path: "/projects/create-new",
      element: (
        <PrivateLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateProject />
          </Suspense>
        </PrivateLayout>
      ),
    },
  ]);
  return routes;
};

export default PrivateRoutes
