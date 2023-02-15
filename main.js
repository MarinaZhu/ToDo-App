window.addEventListener('DOMContentLoaded', () =>{
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name')
          newTodoForm = document.querySelector('#new-todo-form'),
          userName = localStorage.getItem('username') || '';

    nameInput.value = userName;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
        }

        if (todo.content && todo.category) {
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));

            // Reset the form
            e.target.reset();

            DisplayTodos();
        } else {
            alert('Please enter a todo and select a category');
        }
    });
    DisplayTodos();
});

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label'),
              input = document.createElement('input'),
              span = document.createElement('span'),
              content = document.createElement('div'),
              actions = document.createElement('div'),
              edit = document.createElement('button'),
              deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'business') {
            span.classList.add('business');
        } else {
            span.classList.add('personal');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML= `<input type="text" value="${todo.content}" readOnly>`;
        edit.innerHTML = 'Edit';
        deleteButton.textContent = 'Delete';

        todoItem.appendChild(label);
        label.appendChild(input);
        label.appendChild(span);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('change', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            todoItem.classList.toggle('done');
        });

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readOnly');
            input.focus();

            input.addEventListener('blur', e => {
                input.setAttribute('readOnly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });
        });

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        });
    });
}