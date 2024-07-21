import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomeLayout from "./Components/Layouts/HomeLayout";
import Homepage from "./Components/HomePage/Homepage";
import AllTransactions from "./Components/Transactions/AllTransactions";
import Charts from "./Components/Insights/Charts";

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
        },
        {
          path: "/insights",
          element: <Charts />
        },
        {
          path: "/*",
          element: <Homepage />
        },
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
