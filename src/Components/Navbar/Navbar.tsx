const Navbar = () => {
  return (
    <nav className="sticky top-0 right-0 py-5 px-10 bg-mat-blue flex flex-col tablet:flex-row justify-between text-center gap-5">
      <ul className="text-white flex flex-col gap-9 tablet:flex-row w-3/5 justify-around list-none m-auto">
        <li className="nav-text">Home</li>
        <li className="nav-text">About</li>
        <li className="nav-text">Service</li>
        <li className="nav-text">Contact</li>
      </ul>
      <div>
        <button>Button</button>
      </div>
    </nav>
  )
}

export default Navbar
