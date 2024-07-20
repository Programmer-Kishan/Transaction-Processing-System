import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Homepage from "./Components/HomePage/Homepage";
import AddTransaction from "./Components/Transactions/AddTransaction";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/add",
      element: <AddTransaction />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
