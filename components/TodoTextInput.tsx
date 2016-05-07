import * as React from 'react'
import classnames = require('classnames')

interface TodoTextInputProps {
  onSave: Function
  text?: string
  placeholder?: string
  editing?: boolean
  newTodo?: boolean
}

interface TodoTextInputState {
  text: string
}

class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {
  constructor(props?: TodoTextInputProps, context?: any) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  render(): JSX.Element {
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        type='text'
        placeholder={this.props.placeholder}
        autoFocus='true'
        value={this.state.text}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />
    )
  }

  private handleSubmit(e: React.KeyboardEvent) {
    const text = e.target['value'].trim()
    if (e.keyCode === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  private handleChange(e: React.FormEvent) {
    this.setState({ text: e.target['value'] })
  }

  private handleBlur(e: React.FormEvent) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target['value'])
    }
  }
}

export default TodoTextInput
