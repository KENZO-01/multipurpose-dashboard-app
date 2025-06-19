import PrivateLayout from '@/layout/private-layout';
import Overview from '@/pages/overview';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const PrivateRoutes = () => {
  const routes = useRoutes([
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
  ]);
  return routes;
};

export default PrivateRoutes
