import Title from "./Title"
import Language from "./Language"
import Logo from "./Logo"
import Menu from "./Menu"
import User from "./User"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-3 md:gap-5 px-3 md:px-6 h-16 text-slate-100 bg-red-800">
      <div className="flex items-center gap-2">
        <Logo/>
        <Title/>
      </div>
      <div className="flex items-center gap-2">
        <Language/>
        <Menu/>
      </div>
    </div>
  )
}

export default Navbar