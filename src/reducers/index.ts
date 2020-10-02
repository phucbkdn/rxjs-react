import { merge } from 'rxjs'
import { map } from 'rxjs/operators'
import CounterReducer$ from './CounterReducers'

const reducer$ = merge(CounterReducer$).pipe(
  map((reducer: any) => ["counter", reducer])
)

export default reducer$