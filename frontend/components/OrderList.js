import React from 'react'
import { selectSizeFilter } from '../state/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useGetOrdersQuery } from '../state/orderApi'

export default function OrderList() {
  const {data: orders} = useGetOrdersQuery()
  const currentSize = useSelector(st => st.filters.pizzaSize)
  const dispatch = useDispatch()

  const filteredOrderList = currentSize === 'All'
  ? orders : orders?.filter(order => order.size === currentSize)

  const numberOfToppings = (toppings) => {
    if(!toppings){
      return 'no toppings'
    } else if(toppings.length === 1) {
      return '1 topping'
    } else {
      return `${toppings.length} toppings`
    }
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
      { filteredOrderList?.map((order) => {
            const { customer, id, size, toppings } = order
            return (
              <li key={id}>
                <div>
                {`${customer} ordered a size ${size} with ${numberOfToppings(toppings)}`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => {
                dispatch(selectSizeFilter(size))
              }}
              >{size}</button>
          })
        }
      </div>
    </div>
  )
}
