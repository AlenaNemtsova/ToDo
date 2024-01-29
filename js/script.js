'use strict';


const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const toDoData = localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('todo-list', JSON.stringify(toDoData))
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            const itemIndex = toDoData.indexOf(item);
            localStorage.setItem('todo-list', JSON.stringify(toDoData))
            toDoData.splice(itemIndex, 1);
            render();
        })
    });
};


todoControl.addEventListener('submit', function (event) {
    event.preventDefault()

    if (headerInput.value.trim() !== '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        };

        toDoData.push(newToDo);
        headerInput.value = '';

        localStorage.setItem('todo-list', JSON.stringify(toDoData));
        render();
    }

});

document.addEventListener('DOMContentLoaded', function () {
    render()
});
