import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
