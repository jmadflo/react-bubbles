import React, { useState, useEffect } from 'react'
// import axios from 'axios'

import Bubbles from './Bubbles'
import ColorList from './ColorList'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const BubblePage = () => {
  const [colorList, setColorList] = useState([])
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth().get('/api/colors')
    .then(response => {
      console.log(response)
      setColorList(response.data)
    })
    .catch(error => {
      alert('Could not get list of colors from server.', error )
    })
  }, []) // Since we did not add a dependency, the get request will only run once just after the component first renders. This behaves the same as if we had used componentDidMount()
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  )
}

export default BubblePage
