document.addEventListener('DOMContentLoaded', () => {
    // Select the "Add Task" button, input field, and task list
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    // Define the addTask function
    function addTask() {
        const taskText = taskInput.value.trim(); // Trim input text

        // Check if taskText is empty
        if (taskText === ""){
            alert("Enter a task!!!");
            return;
        }
        
        // Create new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a "Remove" button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Add the remove button's click event listener
        removeButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
                tasks = tasks.filter(task => task !== taskText);
                savedTasks()
            });
        
        // Append the button to the task item, then append task item to task list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        tasks.push(taskText);
        saveTasks();

        // Clear the task input field after adding the task
        taskInput.value = "";
    }
    // Save tasks to Local Storage
    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from Local Storage when the page loads
    function loadTasks(){
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks){
            tasks = JSON.stringify(savedTasks); // Convert JSON string back to array
            tasks.forEach(taskText => {
                // Create new <li> element for each task
                const taskItem = document.createElement('li');
                taskItem.textContent = taskText;
                
                // Create a "Remove" button for the task
                const removeButton = document.createElement('button');
                removeButton.textContent = "Remove";
                removeButton.className = "remove-btn";

                // Add the remove button's click event listener
                removeButton.addEventListener('click', () => {
                    taskList.removeChild(taskItem); // Remove task from the DOM
                    tasks = tasks.filter(task => task !== taskText); // Remove task from the tasks array
                    saveTasks(); // Update Local Storage
                });
                taskItem.appendChild(removeButton);
                taskList.appendChild(taskItem);
            });
        }
    }
    

    // Add click event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener for the Enter key
    taskInput.addEventListener('keypress', function(event){
        if (event.key === "Enter"){
            addTask(); // Call addTask when Enter key is pressed
        }
    });

    loadTasks();

});