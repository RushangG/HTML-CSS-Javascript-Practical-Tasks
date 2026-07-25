
const tableBody = document.getElementById('table-body');
let dragRow = null;
const statusFilter = document.getElementById('status-filter');


// get from local storage
async function getLocalStorageTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

// set to local storage
async function setLocalStorageTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// add function , task add to local storage
async function addTask(task) {

    const tasks = await getLocalStorageTasks();
    tasks.push(task);
    await setLocalStorageTasks(tasks);
    document.getElementById('status-filter').value = 'all';
    showTasks();
}

async function showTasks(filtertasks = null) {
    const allTasks = await getLocalStorageTasks();


    document.getElementById('add-task-button').textContent = 'Add Task';


    tableBody.innerHTML = '';


    const tasks = filtertasks !== null ? filtertasks : allTasks;

    if (tasks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No tasks available</td></tr>';
        return;
    }

    tasks.forEach((task, index) => {
        const taskRow = document.createElement('tr');
        taskRow.setAttribute('draggable', 'true');


        taskRow.innerHTML = `
                    <td style="display: none;">${task.id}</td>
                    <td><div class="task-text">${task.description}</div></td>
                    <td>${task.status}</td>
                    <td> 
                        <button class="edit-button" onclick="editTask(${task.id} )">Edit</button>
                        <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
                    </td> 

                `;
        tableBody.appendChild(taskRow);

    });
}

//delete task function
async function deleteTask(id) {

    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    const tasks = await getLocalStorageTasks();
    tasks.forEach((task, index) => {
        if (task.id === id) {
            tasks.splice(index, 1);
        }
    });
    await setLocalStorageTasks(tasks);
    statusFilter.value = 'all';
    showTasks();
    document.getElementById('add-task-button').removeAttribute('data-edit-id');
}

//edit task function
async function editTask(id) {


    const tasks = await getLocalStorageTasks();
    const taskToEdit = tasks.find(task => task.id === id);

    if (!taskToEdit) {
        alert('Task not found.');
        return;
    }

    document.getElementById('task-description-id').value = taskToEdit.description;
    document.getElementById('task-status').value = taskToEdit.status;

    document.getElementById('add-task-button').textContent = 'Update task';
    document.getElementById('add-task-button').dataset.editId = id;

}

//filter task by status 
async function filterTasksByStatus(status) {


    const tasks = await getLocalStorageTasks();
    const filteredTasks = status === 'all' ? tasks : tasks.filter(task => task.status === status);


    showTasks(filteredTasks);

}

async function setReorderedTasks() {
    const reorderedTasks = [];
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const taskId = parseInt(row.cells[0].textContent);
        const tasksDescription = row.cells[1].textContent;
        const tasksStatus = row.cells[2].textContent;

        reorderedTasks.push({
            id: taskId,
            description: tasksDescription,
            status: tasksStatus
        });
    });

    await setLocalStorageTasks(reorderedTasks);

}

async function dragStart(e) {
    // console.log('start  drag and drop event t    riggered', e , e.target);

    const currentFilter = statusFilter.value;
    if (currentFilter !== 'all') {
        return;
    }

    dragRow = e.target.closest('tr');
    dragRow.classList.add('dragging');

}


async function dragEnd(e) {
    // console.log('drag end event triggered', e); 
    const currentFilter = statusFilter.value;
    if (currentFilter !== 'all') {
        alert('Change the filter to "ALL" to activate drag and drop functionality.');
        return;
    }

    if (dragRow) {
        dragRow.classList.remove('dragging');
        dragRow = null;
    }

    await setReorderedTasks();

}

async function dragOver(e) {

    e.preventDefault();

    const currentFilter = statusFilter.value;
    if (currentFilter !== 'all') {
        return;
    }
    // console.log('over .... drag and drop over tigger', e);
    // console.log('dragged element', e.target);

    const targetRow = e.target.closest('tr');




    if (targetRow && targetRow !== dragRow) {
        let isMoveDown = dragRow.offsetTop < targetRow.offsetTop;
        // console.log('isMoveDown', isMoveDown , 'dragRow.offsetTop', dragRow.offsetTop, 'targetRow.offsetTop', targetRow.offsetTop);

        if (isMoveDown) {
            tableBody.insertBefore(dragRow, targetRow.nextSibling);
        }
        else {
            tableBody.insertBefore(dragRow, targetRow);
        }
    }


}



document.getElementById('status-filter').addEventListener('change', async (event) => {

    const status = event.target.value;
    filterTasksByStatus(status);


});

document.getElementById('add-task-button').addEventListener('click', async (event) => {


    event.preventDefault();


    const taskDescription = document.getElementById('task-description-id').value;
    const taskStatus = document.getElementById('task-status').value;

    if (taskDescription.trim() === '') {
        alert('Task description cannot be empty.');
        return;
    }

    const editId = document.getElementById('add-task-button').dataset.editId;
    //update logic
    if (editId) {


        const tasks = await getLocalStorageTasks();
        const taskIndex = tasks.findIndex(task => task.id === parseInt(editId));
        tasks[taskIndex].description = taskDescription;
        tasks[taskIndex].status = taskStatus;

        await setLocalStorageTasks(tasks);
        statusFilter.value = 'all';
        showTasks();

    }
    else {
        // add new task logic
        const id = Date.now();

        const task = {
            id: id,
            description: taskDescription,
            status: taskStatus
        };

        await addTask(task);
    }
    document.getElementById('task-description-id').value = '';
    document.getElementById('task-status').value = 'in-complete';
    document.getElementById('add-task-button').textContent = 'Add Task';
    document.getElementById('add-task-button').removeAttribute('data-edit-id');
    statusFilter.value = 'all';



});


tableBody.addEventListener('dragstart', dragStart);
tableBody.addEventListener('dragend', dragEnd);
tableBody.addEventListener('dragover', dragOver);


document.addEventListener('DOMContentLoaded', () => {
    showTasks();

});



