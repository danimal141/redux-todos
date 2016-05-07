import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Todo } from '../models/todo'
import Header from '../components/Header'
import MainSection from '../components/MainSection'

interface AppProps {
  todos: Todo[]
  dispatch: Dispatch
}

class App extends React.Component<AppProps, void> {
  render() {
    const { todos, dispatch } = this.props
    return (
      <div>
        <Header addTodo={(text: string) => dispatch(Actions.addTodo(text))} />
        <MainSection
            todos={todos}
            editTodo={(id: number, text: string) => dispatch(Actions.editTodo(id, text))}
            deleteTodo={(id: number) => dispatch(Actions.deleteTodo(id))}
            completeTodo={(id: number) => dispatch(Actions.completeTodo(id))}
            clearCompleted={() => dispatch(Actions.clearCompleted())}
            completeAll={() => dispatch(Actions.completeAll())} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

export default connect(
  mapStateToProps
)(App)
