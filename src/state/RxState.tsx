import React, { Component, FC } from 'react'
import { Subject, of, merge, Subscription } from 'rxjs'
import { scan, publishReplay, refCount, map } from 'rxjs/operators'
import PropTypes from "prop-types";

export const createAction = () => new Subject()

export const createActions = (actionsName: Array<string>): any => actionsName.reduce((akk, name) => ({ ...akk, [name]: createAction() }), {})

export const createState = (reducer$: any, initState = of({})) =>
  merge(initState, reducer$).pipe(
    // @ts-ignore
    scan((state, [scope, reducer]) => ({ ...state, [scope]: reducer(state[scope]) })),
    publishReplay(1),
    refCount() 
  )

export const connect = (selector = (state: any) => state, actionSubject: any) => {
  const actions = Object.keys(actionSubject)
    .reduce((akk, key) => ({ ...akk, [key]: (value: any) => actionSubject[key].next(value) }), {})

  return (WrappedComponent: FC | any) => {
    return class Connect extends Component {
      static contextTypes = {
        state$: PropTypes.object.isRequired,
      };

      subscription: Subscription;
      constructor(props: any) {
        super(props);
        this.subscription = new Subscription();
        this.state = {}
        this.setState = this.setState.bind(this); 
      }
      
      componentDidMount() {
        this.subscription = this.context.state$.pipe(
          map(selector)
        ).subscribe(this.setState)
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent {...this.state} {...this.props} {...actions} />
        )
      }
    }
  }
}

interface IRecipeProps {
  state$?: any;
}

interface IRecipeState {
}

export class Provide extends Component<IRecipeProps, IRecipeState> {
  static propTypes = {
    state$: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    state$: PropTypes.object.isRequired,
  };

  getChildContext() {
    return { state$: this.props.state$ }
  }

  render() {
    return this.props.children
  }
}
