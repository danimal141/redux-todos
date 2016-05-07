import * as React from 'react'
import classnames = require('classnames')
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

interface FooterProps {
  completedCount: number
  activeCount: number
  filter: string
  onClearCompleted: Function
  onShow: Function
}

class Footer extends React.Component<FooterProps, void> {
  render(): JSX.Element {
    return (
      <footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
          {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }

  private renderTodoCount(): JSX.Element {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'
    return (
      <span className='todo-count'>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  private renderFilterLink(filter: string): JSX.Element {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = this.props
    return (
      <a className={classnames({ selected: filter === selectedFilter })}
         style={{ cursor: 'pointer' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  private renderClearButton(): JSX.Element {
    const { completedCount, onClearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <button
          className='clear-completed'
          onClick={onClearCompleted} >
          Clear completed
        </button>
      )
    }
  }
}

export default Footer
