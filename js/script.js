const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const toDoList = document.querySelector('.todo-list')
const toDoCompleted = document.querySelector('.todo-completed')
let toDoData = []

window.addEventListener('load', function () {
    toDoData = loadData();
    render();

})

const render = function () {
    toDoList.innerHTML = ''
    toDoCompleted.innerHTML = ''
    toDoData.forEach((item, index) => {
        const li = document.createElement("li")
        li.classList.add("todo-item")

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div >'

        if (item.text === '') {
            return;
        }

        if (item.completed) {
            toDoCompleted.append(li)
        } else {

            toDoList.append(li)
        }



        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            render();
            SaveData()

        })
        li.querySelector('.todo-remove').addEventListener('click', function () {
            remove(index)
            render()
            SaveData()
        })
    })
}

todoControl.addEventListener("submit", function (event) {
    event.preventDefault()

    const newToDo = {
        text: headerInput.value,
        completed: false
    }

    toDoData.push(newToDo)
    headerInput.value = ""

    render()
    SaveData()
})

const remove = function (index) {
    toDoData.splice(index, 1)
    SaveData()
}
const SaveData = function () {
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
}

const loadData = function () {
    const loadData = JSON.parse(localStorage.getItem('toDoData'))
    return loadData;
}
