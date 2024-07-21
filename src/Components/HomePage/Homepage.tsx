import { NavLink } from "react-router-dom"

const Homepage = () => {
  return (
    <>
        <div className="w-full h-screen bg-grayish-white dark:bg-dark-gray flex flex-col justify-center items-center gap-9">
            <h1 className="tablet:text-8xl text-6xl text-center font-montserrat font-extrabold text-whiteish-blue">
                Transaction Processing System
            </h1>
            <NavLink to="/transaction" className="bg-mat-blue py-3 px-5 font-poppins font-semibold rounded-lg text-lg hover:tracking-wider transition-all">
                Get Stated {">"}
            </NavLink>
        </div>
    </>
  )
}

export default Homepage
