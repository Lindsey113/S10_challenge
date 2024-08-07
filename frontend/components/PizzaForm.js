import React, { useReducer } from 'react'
import { useCreateOrderMutation } from '../state/orderApi'

const CHANGE_FULL_NAME = 'CHANGE_FULL_NAME'
const SELECT_ORDER_SIZE = 'SELECT_ORDER_SIZE'
const CHOOSE_TOPPINGS = 'CHOOSE_TOPPINGS'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  toppings: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  }

}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_FULL_NAME: {
      return { ...state, fullName: action.payload }
    }
    case SELECT_ORDER_SIZE: {
      return { ...state, size: action.payload }
    }
    case CHOOSE_TOPPINGS: {
      return {
        ...state, toppings: {
          ...state.toppings,
          [action.payload]: !state.toppings[action.payload]
        }
      }
    }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

const chosenToppings = (toppings) => {
  return Object.keys(toppings).filter(topping => toppings[topping])
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, { error: createOrderError, isLoading: creatingOrder }] = useCreateOrderMutation()

  const onNameChange = (e) => {
    const { value } = e.target
    dispatch({ type: CHANGE_FULL_NAME, payload: value })
  }

  const onSizeChange = (e) => {
    const { value } = e.target
    dispatch({ type: SELECT_ORDER_SIZE, payload: value })
  }

  const chosenTopping = (e) => {
    const { name } = e.target
    dispatch({ type: CHOOSE_TOPPINGS, payload: name })
  }

  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size, toppings } = state
    createOrder({
      fullName, size, toppings: chosenToppings(toppings)
    })
      .unwrap()
      .then(() => {
        resetForm()
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <form id='orderForm' onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {createOrderError && <div className='failure'>{createOrderError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            onChange={onNameChange}
            type="text"
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onSizeChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onClick={chosenTopping} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onClick={chosenTopping} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onClick={chosenTopping} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onClick={chosenTopping} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onClick={chosenTopping} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
