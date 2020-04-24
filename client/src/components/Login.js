import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [ credentials, setCredentials ] = useState({
      username: '',
      password: ''
  })

  // will use to render loader conditionally
  const [ isLoading, setIsLoading ] = useState(false) 

  // update state with new form values
  const updateForm = event => {
      setCredentials({
          ...credentials,
          [event.target.name]: event.target.value
      })
  }

  const handleSubmit = event => {
      event.preventDefault()
      // render spinner
      setIsLoading(true)
      axiosWithAuth().post('/api/login', credentials)
      .then(response => {
          console.log(response)
          // store token in local storage with label 'token'
          localStorage.setItem('token', response.data.payload)
          setIsLoading(false)
          setCredentials({
              username: '',
              password: ''
          })
          console.log(localStorage)
          // redirect user to /friends after successful login
          props.history.push('/bubble')
      })
      .catch(() => {
          setIsLoading(false)
          alert('This username and password combination is incorrect.')
          console.log(localStorage)
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <label htmlFor='username'>Username</label>
        <input
            id='username'
            name='username'
            type='text'
            onChange={updateForm}
        />
        <label htmlFor='password'>Password</label>
        <input
            id='password'
            name='password'
            type='password'
            onChange={updateForm}
        />
        <div className='formButtons'><button onClick={handleSubmit}>Log In</button></div>
      </form>
      
      {/* Render loader under form when loading */}
      {isLoading && (
          <div>
              <Loader type='TailSpin' color='blue' width='50'/>
          </div>
      )}
    </>
  )
}

export default Login
