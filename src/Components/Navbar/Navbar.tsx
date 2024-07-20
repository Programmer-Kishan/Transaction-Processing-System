import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

  const [show, setShow] = useState<string>("hidden");

  function handleNavbarShow() {
    setShow(show === "hidden" ? "flex" : "hidden");
  }

  return (
    <nav className="sticky top-0 right-0 py-5 px-10 bg-mat-blue flex flex-col tablet:flex-row justify-between text-center gap-5">
      <button 
        onClick={handleNavbarShow} 
        className="tablet:hidden w-full flex justify-end text-2xl cursor-pointer">
        <GiHamburgerMenu />
      </button>
      <div className={`${show} tablet:flex flex-col tablet:flex-row gap-5 w-full`}>
        <ul className="text-white flex flex-col gap-9 tablet:flex-row w-3/5 justify-around list-none m-auto">
          <li className="nav-text">Home</li>
          <li className="nav-text">About</li>
          <li className="nav-text">Service</li>
          <li className="nav-text">Contact</li>
        </ul>
        <div>
          <button>Button</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
