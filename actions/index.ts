import * as types from '../constants/ActionTypes'
import { Action } from '../models/action'

export function addTodo(text: string): Action {
  return { type: types.ADD_TODO, text }
}

export function deleteTodo(id: number): Action {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id: number, text: string): Action {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id: number): Action {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll(): Action {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted(): Action {
  return { type: types.CLEAR_COMPLETED }
}
