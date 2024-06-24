import './App.css';
import Login from './pages/Login';
import List from './pages/List';
import Game from './pages/Game'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/list",
    element: <List />
  },
  {
    path: "/info/:id",
    element: <Game />
  }
])

function App() {



  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
