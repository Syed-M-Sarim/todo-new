document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('button');
    const inp = document.querySelector('input');
    const ol = document.querySelector('ol');

    // Load existing tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));

    btn.addEventListener("click", function(){
        const taskText = inp.value.trim();
        if(taskText === "") return;
        addTaskToDOM(taskText);
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        inp.value = "";
    });

    ol.addEventListener("click", function(event){
        if(event.target.nodeName === "BUTTON"){
            const listItem = event.target.parentElement;
            const taskText = listItem.firstChild.textContent.trim();
            listItem.remove();
            const index = tasks.indexOf(taskText);
            if(index > -1){
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });

    function addTaskToDOM(task) {
        const item = document.createElement("li");
        item.textContent = task + " ";
        const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.classList.add("delete");
        item.appendChild(delBtn);
        ol.appendChild(item);
    }
});




// let delBtns = document.querySelectorAll(".delete");

// for (let delBtn of delBtns) {
//   delBtn.addEventListener("click", function() {
//     let par = this.parentElement;
//     par.remove();
//   });
// }
