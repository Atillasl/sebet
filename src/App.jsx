import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Shop } from "./Shop/Shop";
import { Link } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {path:"/Shop",element: <Shop/>}
]);

function App() {
  return (
    
    <div className="w-[1440px] mx-auto" c>
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
