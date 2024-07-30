import React, { useReducer } from 'react'
import { useCreateOrderMutation } from '../state/orderApi'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case RESET_FORM:
      return {
        fullName: '',
        size: '',
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
      }
    default: return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, { error: createOrderError, isLoading: creatingOrder }] = useCreateOrderMutation()
  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size,
      '1': pepperoni,
      '2': greenPeppers,
      '3': pineapple,
      '4': mushrooms,
      '5': ham } = state
    createOrder({
      fullName, size,
      '1': pepperoni,
      '2': greenPeppers,
      '3': pineapple,
      '4': mushrooms,
      '5': ham
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
      {true && <div className='pending'>{creatingOrder && creatingOrder.data.message}</div>}
      {true && <div className='failure'>{createOrderError}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            onChange={onChange}
            type="text"
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
