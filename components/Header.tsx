import * as React from 'react'
import TodoTextInput from './TodoTextInput'

interface HeaderProps {
  addTodo: (string) => any
}

class Header extends React.Component<HeaderProps, void> {
  render(): JSX.Element {
    return (
      <header className='header'>
          <h1>todos</h1>
          <TodoTextInput
            newTodo
            onSave={this.handleSave.bind(this)}
            placeholder='What needs to be done?' />
      </header>
    )
  }

  private handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }
}

export default Header
