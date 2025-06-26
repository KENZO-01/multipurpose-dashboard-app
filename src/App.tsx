import './App.css';
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "@/routes/public-routes";
import PrivateRoutes from "@/routes/private-routes";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ThemeProvider } from './components/theme-provider';
import { Provider } from "react-redux";
import store from './Store/store';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <PublicRoutes />
            <PrivateRoutes />
            {/* <Routes>
              <Route path='*' element={<div>page not found </div>} />
            </Routes> */}
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
