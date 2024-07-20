import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomeLayout from "./Components/Layouts/HomeLayout";
import Homepage from "./Components/HomePage/Homepage";
import AllTransactions from "./Components/Transactions/AllTransactions";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <Homepage />
        },
        {
          path: "/transaction",
          element: <AllTransactions />
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
