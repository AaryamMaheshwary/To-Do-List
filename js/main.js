function add_task() {
    var task = document.getElementById("task_input").value.trim();
    if (task != "") {
        var str_data = localStorage.getItem("data");
        var json_data = JSON.parse(str_data);
        var task_data = {
            "id": generate_id(),
            "task": task,
            "completed": false
        };
        if (json_data == null) {
            json_data = [task_data];
        } else {
            json_data.push(task_data);
        }
        str_data = JSON.stringify(json_data);
        localStorage.setItem("data", str_data);
        refresh_list();
    }

    document.getElementById("task_input").value = "";
}

document.getElementById("task_input")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            add_task();
        }
    });

function todo_click(checkbox_icon) {
    var id = checkbox_icon.parentNode.id;
    var str_data = localStorage.getItem("data");
    var json_data = JSON.parse(str_data);

    var index = search_data_for_index_by_id(json_data, id);
    var selected_todo = json_data[index];
    var selected_todo_completed = selected_todo.completed;
    if (selected_todo_completed) {
        json_data[index].completed = false;
    } else {
        json_data[index].completed = true;
    }

    str_data = JSON.stringify(json_data);
    localStorage.setItem("data", str_data);
    refresh_list();
}

function delete_todo(delete_icon) {
    var id = delete_icon.parentNode.id;
    var str_data = localStorage.getItem("data");
    var json_data = JSON.parse(str_data);

    var index = search_data_for_index_by_id(json_data, id);
    json_data.splice(index, 1);

    str_data = JSON.stringify(json_data);
    localStorage.setItem("data", str_data);
    refresh_list();
}

function refresh_list() {
    var todo_tasks = document.getElementById("todo_tasks");
    todo_tasks.innerHTML = "";
    var str_data = localStorage.getItem("data");

    if (str_data != null) {
        var json_data = JSON.parse(str_data);
        json_data.forEach((todo) => {

            if (todo.completed) {
                var todo_image = "checked_box";
                todo.task = todo.task.strike();
                var todo_text_color = "text-muted";
            } else {
                var todo_image = "unchecked_box";
                var todo_text_color = "";
            }

            var task_html = `
                <div id='${todo.id}' class='row mb-1'>
                    <img class='m-1' src='img/${todo_image}.png' width='24'
                        height='24' onclick='todo_click(this)'>
                    <div class='col text-left overflow-hidden'>
                        <h5 class='py-1 ${todo_text_color}'>${todo.task}</h5>
                    </div>
                        <img class='m-1 col col-auto' src='img/trash.png'
                            width='24' height='24' onclick='delete_todo(this)'>
                </div>
            `;
            todo_tasks.innerHTML += task_html;
        });
    }
}

function generate_id() {
    var id = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id_length = 10;
    for (var i = 0; i < id_length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function search_data_for_index_by_id(data, id) {
    for (var index = 0; index < data.length; index++) {
        if (data[index].id == id) {
            return index;
        }
    }
}

window.onload = function () {
    refresh_list();
}