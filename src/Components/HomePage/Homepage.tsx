import { NavLink } from "react-router-dom"

import Navbar from "../Navbar/Navbar"

const Homepage = () => {
  return (
    <>
        <Navbar />
        <div className="w-full h-screen bg-grayish-white flex flex-col justify-center items-center gap-5">
            <h1 className="tablet:text-8xl text-6xl text-center font-montserrat font-extrabold text-whiteish-blue mb-10">
                Transaction Processing System
            </h1>
            <NavLink to="/add" className="bg-mat-blue py-3 px-5 font-poppins font-semibold rounded-lg text-lg hover:tracking-wider transition-all">
                Get Stated {">"}
            </NavLink>
        </div>
    </>
  )
}

export default Homepage
