const parser = new DOMParser();
    const parserType = "text/html";
    const newTask = title =>
        `<div class="task">
            <input class="task__status" type="checkbox" name="task_status" />
            <input class="task__title" type="text" value="${title}" />
        </div>`;


const init = function () {
    const newTaskBtnEl = document.querySelector(".task__add");
    const newTaskInputEl = document.querySelector(".task__title");
    
    const taskListEl = document.querySelector(".task-list");
    const taskElArr = taskListEl.querySelectorAll(".task");
    const updateNewTaskButtonStatus = () => {
        const isEmpty = Boolean(newTaskInputEl.value);
        const isDisabled = !isEmpty;
        newTaskBtnEl.disabled = isDisabled;
        if(isDisabled){
            newTaskBtnEl.classList.add("task__add--disable");
        }else{
            newTaskBtnEl.classList.remove("task__add--disable");
        }
    };

    updateNewTaskButtonStatus();

    ["input", "change"].forEach((eventType)=>{
        newTaskInputEl.addEventListener(eventType, function () {
            console.log(eventType);
            updateNewTaskButtonStatus();
        }, true);
    });

    const statusListener = function (event) {
        this.task.classList.toggle("task--done");
        this.input.disabled = !this.input.disabled;
        console.log(this.input);
    };

    const addStatusListener = taskEl => {
        const statusEl = taskEl.querySelector(".task__status");
        const inputEl = taskEl.querySelector(".task__title");
        statusEl.addEventListener("change", statusListener.bind({
            task:taskEl, status:statusEl, input: inputEl
        }));
    }

    taskElArr.forEach((task) => {
        addStatusListener(task);
    });

    //create a new task inside the list of items
    newTaskBtnEl.addEventListener("click", function () {
        const { value } = newTaskInputEl;
            if (Boolean(value)) {
                const parsedTask = newTask(value);
                const taskDocument = parser.parseFromString(parsedTask, parserType);
                const newTaskDOM = taskDocument.querySelector(".task");
                taskListEl.appendChild(newTaskDOM);
                addStatusListener(newTaskDOM);
            
            }
        newTaskInputEl.value = "";
        updateNewTaskButtonStatus();
    });


};

init();





