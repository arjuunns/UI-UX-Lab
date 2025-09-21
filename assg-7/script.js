const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    // Title and description
    if (task.editing) {
      taskDiv.innerHTML = `
        <input type="text" class="edit-title" value="${task.title}">
        <input type="text" class="edit-desc" value="${task.desc}">
        <div class="task-buttons">
          <button class="save-btn">Save</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    } else {
      taskDiv.innerHTML = `
        <div class="task-title${task.completed ? ' completed' : ''}">${task.title}</div>
        <div class="task-desc${task.completed ? ' completed' : ''}">${task.desc}</div>
        <div class="task-buttons">
          <button class="complete-btn">${task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    }
    // Button actions
    const buttons = taskDiv.querySelector('.task-buttons');
    if (task.editing) {
      buttons.querySelector('.save-btn').onclick = () => {
        const newTitle = taskDiv.querySelector('.edit-title').value.trim();
        const newDesc = taskDiv.querySelector('.edit-desc').value.trim();
        if (newTitle && newDesc) {
          task.title = newTitle;
          task.desc = newDesc;
          task.editing = false;
          renderTasks();
        }
      };
      buttons.querySelector('.delete-btn').onclick = () => {
        tasks.splice(idx, 1);
        renderTasks();
      };
    } else {
      buttons.querySelector('.complete-btn').onclick = () => {
        task.completed = !task.completed;
        renderTasks();
      };
      buttons.querySelector('.edit-btn').onclick = () => {
        task.editing = true;
        renderTasks();
      };
      buttons.querySelector('.delete-btn').onclick = () => {
        tasks.splice(idx, 1);
        renderTasks();
      };
    }
    taskList.appendChild(taskDiv);
  });
}

taskForm.onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('task-title').value.trim();
  const desc = document.getElementById('task-desc').value.trim();
  if (title && desc) {
    tasks.push({ title, desc, completed: false, editing: false });
    renderTasks();
    taskForm.reset();
  }
};

renderTasks();
