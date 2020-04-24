import axios from 'axios'

export const axiosWithAuth = () => {
  // modified lecture code to address browser error. Got fix from help channel
  const token = localStorage.getItem('token')
  return axios.create({
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    },
    baseURL: 'http://localhost:5000'
  })
}