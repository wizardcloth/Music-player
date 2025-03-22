import { Link } from "react-router-dom"

function Header() {
  return (
    <div>
      <Link to="/">
        <h1 className="text-3xl pb-4 font-bold hover:text-emerald-400 cursor-pointer">Music Manager</h1>
      </Link>
    </div>
  )
}

export default Header