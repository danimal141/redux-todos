import * as React from 'react'
import { Todo } from '../models/todo'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

interface MainSectionProps {
  todos: Todo[]
  clearCompleted: Function
  completeAll: Function
  editTodo: Function
  completeTodo: Function
  deleteTodo: Function
}
interface MainSectionState {
  filter: string;
}

class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  constructor(props?: MainSectionProps, context?: any) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  render(): JSX.Element {
    const { todos, completeTodo, deleteTodo, editTodo } = this.props
    const { filter } = this.state
    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
    return (
      <section className='main'>
        {this.renderToggleAll(completedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}/>
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }

  private handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)
    if (atLeastOneCompleted) {
      this.props.clearCompleted()
    }
  }

  private handleShow(filter: string) {
    this.setState({ filter })
  }

  private renderToggleAll(completedCount: number): JSX.Element {
    const { todos, completeAll } = this.props
    if (todos.length > 0) {
      return (
        <input
          className='toggle-all'
          type='checkbox'
          checked={completedCount === todos.length}
          onChange={() => completeAll()} />
      )
    }
  }

  private renderFooter(completedCount: number): JSX.Element {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount
    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onShow={this.handleShow.bind(this)} />
      )
    }
  }
}

export default MainSection
