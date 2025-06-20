import './App.css';
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "@/routes/public-routes";
import PrivateRoutes from "@/routes/private-routes";

function App() {
  return (
    <BrowserRouter>
      <PublicRoutes />
      <PrivateRoutes />
    </BrowserRouter>
  );
}

export default App;
