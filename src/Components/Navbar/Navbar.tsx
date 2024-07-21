import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { TiWeatherSunny } from "react-icons/ti";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {

  const [show, setShow] = useState<string>("hidden");
  const [dark, setDark] = useState<boolean>(false);

  function handleNavbarShow() {
    setShow(show === "hidden" ? "flex" : "hidden");
  }

  function darkModeHandler() {
    setDark(!dark);
    document.body.classList.toggle('dark');
  }

  return (
    <nav className="sticky w-full top-0 right-0 py-5 px-10 bg-mat-blue flex flex-col tablet:flex-row justify-between text-center gap-5">
      <button 
        onClick={handleNavbarShow} 
        className="tablet:hidden w-full flex justify-end text-2xl cursor-pointer">
        <GiHamburgerMenu />
      </button>
      <div className={`${show} tablet:flex flex-col tablet:flex-row gap-5 w-full items-center`}>
        <ul className="text-white flex flex-col gap-9 tablet:flex-row w-3/5 justify-around NavLinkst-none m-auto">
          <NavLink to="/" className="nav-text">Home</NavLink>
          <NavLink to="/" className="nav-text">About</NavLink>
          <NavLink to="/" className="nav-text">Service</NavLink>
          <NavLink to="/" className="nav-text">Contact</NavLink>
        </ul>
        <div onClick={darkModeHandler} className="text-3xl cursor-pointer p-1 rounded-md">
          {dark ? <FaMoon /> : <TiWeatherSunny />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
