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
    <div style={pageStyles}>
      <h1>Welcome to the Bubble App!</h1>
      <form style={formStyles}>
        <label style={labelStyles} htmlFor='username'>Username  
          <input
              id='username'
              name='username'
              type='text'
              onChange={updateForm}
          />
        </label>
        <label style={labelStyles} htmlFor='password'>Password  
          <input
              id='password'
              name='password'
              type='password'
              onChange={updateForm}
          />
        </label>
        <button style={buttonStyles} onClick={handleSubmit}>Log In</button>
      </form>
      
      {/* Render loader when loading */}
      {isLoading && (
          <div>
              <Loader type='TailSpin' color='blue' width='50'/>
          </div>
      )}
    </div>
  )
}

// doing my login styles like this to avoid messing with scss file 

const pageStyles = {
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  marginLeft: '25%'
}

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  width: '250px',
  padding: '20px',
  border: '2px solid gray',
  borderRadius: '10px',
  backgroundColor: 'black',
}

const labelStyles = {
  margin: '0 0 4px 10px',
  color: 'white',
}

const inputStyles = {
  marginBottom: '20px',
  width: '100%',
  border: '1px solid gray',
  borderRadius: '4px',
  height: '20px',
  marginLeft: '10px'
}

const buttonStyles = {
  backgroundColor: '#2D88FF',
  color: 'white',
  width: '80px',
  height: '25px',
  fontSize: '0.8rem',
  border: '2px solid white',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
  marginRight: '75px'
}

export default Login
