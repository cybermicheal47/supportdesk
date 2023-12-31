import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/Authslice'

function Header() {
const dispatch = useDispatch()
const navigate = useNavigate()
const {user} = useSelector((state)=> state.auth)


const onlogout = () => {
  dispatch(logout())
 
  navigate('/')
}

  return (
    <header className='header'>
    <div className='logo'>
      <Link to='/'>Support Desk</Link>
    </div>
<ul>
 {user ? (  <li>
            <button className='btn' onClick={onlogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>) : ( <> <li>
    <Link to='/login'>
     <FaSignInAlt/>Login
    </Link>
  </li>
  <li>
    <Link to='/register'>
      <FaSignOutAlt/>Register
    </Link>
  </li> </>)}
</ul>
    </header>
  )
}

export default Header
