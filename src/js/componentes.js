import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    
    <li class="${(todo.completado) ? ' completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? ' checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
     </li>   
 `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    } 
});

divTodoList.addEventListener('click', (event)=>{

    const nombreElemento = event.target.localName;
    const todoElement    = event.target.parentElement.parentElement;
    const todoId         = todoElement.getAttribute('data-id');
    
    if(nombreElemento.includes('input')){
         todoList.marcaCompletado(todoId);
         todoElement.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElement );
    }
});

btnBorrar.addEventListener('click', () =>{
    todoList.eliminarCompletado();

    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilter.addEventListener('click', (event) =>{
    const filtro = event.target.text;

    if(!filtro){return;};

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for ( const element of divTodoList.children ){
        element.classList.remove('hidden')
        const completado = element.classList.contains('completed');
    
        switch(filtro){

            case 'Pendientes':
                if(completado){element.classList.add('hidden')}
                break;

            case 'Completados':
                if(!completado){element.classList.add('hidden')}
                break;
        }
    };

});