import React, { FC } from 'react'
import { connect } from '../state/RxState'
import counterActions from '../actions/counterActions'

interface Props {
  counter: number,
  increment: Function,
  decrement: Function,
  reset: Function,
}

export const Counter: FC<Props> = ({ counter, increment, decrement, reset }: Props) => {
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => increment(1)} id="increment">+</button>
      <button onClick={() => increment(10)} id="increment10">+10</button>
      <button onClick={() => reset()} id="reset">Reset</button>
      <button onClick={() => decrement(1)} id="decrement">-</button>
      <button onClick={() => decrement(10)} id="decrement10">-10</button>
    </div>
  )
}

export default connect(({ counter }) => ({ counter }), counterActions)(Counter)