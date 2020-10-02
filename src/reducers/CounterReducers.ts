import { of, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import counterActions from '../actions/counterActions'

const initState = 10

const CounterReducer$ = merge(
  of(() => initState),
  counterActions.increment.pipe(
    map((payload: number) => (state: number) => state + payload)
  ),
  counterActions.decrement.pipe(
    map((payload: number) => (state: number) => state - payload)
  ),
  counterActions.reset.pipe(
    map((_payload: number) => (_state: number) => initState)
  ),
)

export default CounterReducer$
