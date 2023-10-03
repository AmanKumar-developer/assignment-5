import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="list-container">
        <li className="logo-container">
          <Link to="/" className="nav-links">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo-image"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="nav-links-container">
          <Link to="/" className="nav-links">
            <h1 className="nav-to-name">Home</h1>
            <AiFillHome className="nav-icons" />
          </Link>
          <Link to="/jobs" className="nav-links">
            <h1 className="nav-to-name">Jobs</h1>
            <BsBriefcaseFill className="nav-icons" />
          </Link>
        </li>
        <li className="nav-button-container">
          <FiLogOut className="nav-icons" onClick={onClickLogout} />
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
