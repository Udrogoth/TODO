import './styles.css'
import {Todo, TodoList} from './classes/index'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();



todoList.todos.map(crearTodoHtml);


