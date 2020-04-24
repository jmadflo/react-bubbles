import React, { useState } from 'react'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const initialColor = {
  color: '',
  code: { hex: '' }
}

const ColorList = ({ colors, updateColors }) => {

  const history = useHistory()

  console.log(colors)
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  // color that we will add on addColorForm
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
    console.log(colorToEdit) // can see the 'id' key value pair with this console log
  }

  const saveEdit = event => {
    event.preventDefault()
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        console.log(response)
        updateColors(colors.map(color => {
          // if color is the colorToEdit return the new color in response, otherwise return the same color
          return color.id === colorToEdit.id ? response.data: color
        }))
      })
      .catch(error => {
        alert("Could not update color", error)
      })
  }

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(response => {
        console.log(response)
        updateColors(colors.filter(color => {
          // if color is not the one we just deleted, then return it
          if (color.id !== colorToEdit.id) {
            return color
          }
        }))
      })
      .catch(error => {
        alert("Could not delete color", error)
      })
  }

  // method to add new color
  const addColor = event => {
    event.preventDefault()
    
    // if statement makes sure that user has insert values for both color and hex before post request is made
    if (colorToAdd.color && colorToAdd.code.hex){
      axiosWithAuth().post('/api/colors', colorToAdd)
        .then(response => {
          console.log(response)
          // response.data is the full updated color list
          updateColors(response.data)
          // reset input values
          setColorToAdd(initialColor)
        })
        .catch(error => {
          alert('Could not add the new color to the color list', error)
        })
    } else {
      alert('Please provide both a color name value and hex code value')
    }
  }

  // method to logout by removing token and pushing user to login page
  const logout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={e => {
                    e.stopPropagation()
                    deleteColor(color)
                  }
                }>
                  x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              // use of setColorToEdit in this form shows that colorToEdit.id is the id of the color we want to update in our put request
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* moved spacer to bottom - explanation below*/}
      {/* stretch - build another form here to add a color */}
      {!editing && (
          <form>
            <legend>Add new color</legend>
            <label>Color Name:
              <input
                onChange={event => 
                  setColorToAdd({ ...colorToAdd, color: event.target.value })
                }
                value={colorToAdd.color}
              />
            </label>
            <label>
              Hex Code: 
              <input
                onChange={event => 
                  setColorToAdd({
                    ...colorToAdd,
                    code: { hex: event.target.value}
                  })
                }
                value={colorToAdd.code.hex}
              />
            </label>
            {/* added button-row div for styling */}
            <div className='button-row'> 
              <button onClick={addColor}>add</button>
            </div>
            
          </form>
      )}
      <div className='button-row'>
        <button onClick={logout}>Logout</button>
      </div>
      {/* moved 'spacer' down here because it was pushing my add color form to the bottom of my screen in its previous position */}
      <div className='spacer' />
    </div>
  )
}

export default ColorList
