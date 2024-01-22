import { Link } from 'react-router-dom'
import Logo from '../logo.svg'
import './header.css'

function Header() {
  return (
    <header>
      <Link to='/'>
        <img src={Logo} alt='logo' className='logo'/>
      </Link>

    </header>
  )
}

export default Header;