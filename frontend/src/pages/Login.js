import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/Authslice'
import Spinner from '../components/Spinner'
function Login() {
const[formdata, setformdata] = useState({
  email: '',
  password: ''
})



const {email,password} = formdata



const dispatch = useDispatch()
const navigate = useNavigate()


const{user,isSuccess,isError,isLoading,message} =
  useSelector(
    (state) => state.auth
  )

const onChange = (e) => {
  setformdata((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}


useEffect(()=>{
  if(isError){
    toast.error(message)
  }
 if(isSuccess || user) {
  navigate('/')
 }
dispatch(reset())

}, [dispatch,isError,isSuccess,message,navigate,user])



const onSubmit = (e) =>{
  e.preventDefault()

  const userData = {
    email,
    password
  }

  dispatch(login(userData))
}

if (isLoading){
  return <Spinner />
}

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
    
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
