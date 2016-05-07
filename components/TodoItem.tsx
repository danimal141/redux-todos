import * as React from 'react'
import classnames = require('classnames')
import { Todo } from '../models/todo'
import TodoTextInput from './TodoTextInput'

interface TodoItemProps {
  todo: Todo
  editTodo: Function
  deleteTodo: Function
  completeTodo: Function
  key?: any
}
interface TodoItemState {
  editing: boolean
}

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props?: TodoItemProps, context?: any) {
    super(props, context)
    this.state = { editing: false }
  }

  render(): JSX.Element {
    const { todo, completeTodo, deleteTodo } = this.props
    let element: JSX.Element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button
            className='destroy'
            onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }
    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }

  private handleDoubleClick() {
    this.setState({ editing: true })
  }

  private handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }
}

export default TodoItem
