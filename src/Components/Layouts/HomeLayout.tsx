import { Outlet } from "react-router-dom"

import Navbar from "../Navbar/Navbar"

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default HomeLayout
