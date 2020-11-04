var todoList = [];
var currentClickedItem;
var list = document.querySelector(".cards-list");
function popup(){
    document.querySelector(".main-head").classList.remove("view");
    document.querySelector(".container").classList.add("blur");
    document.querySelector(".container-2").classList.add("blur");
}

function closePopup(){
    document.querySelector(".main-head").classList.add("view");
    document.querySelector(".container").classList.remove("blur");
    document.querySelector(".container-2").classList.remove("blur");
}

function validate(){
    var newListValue = document.getElementById("list-value").value;
    if(newListValue != ""){
        document.querySelector(".container").classList.remove("blur");
        document.querySelector(".main-head").classList.add("view");
        document.querySelector(".empty-list").classList.add("view");
        const todo = {
            heading : newListValue,
            id : Date.now(),
            tasks : [],
        }
        todoList.push(todo);
        showTodo(todo);
        document.querySelector(".container").classList.remove("view");
        document.querySelector(".container-2").classList.add("view");
    }
}

function showTodo(todo){
    for(var i =0;i<todoList.length;i++){
        if(todoList[i] === todo){
            var node = document.createElement("div");
            node.setAttribute("class","card-container");
            node.setAttribute("data-key", todo.id);
            node.innerHTML = `
            <div class = "card-head-text" onclick = "detailCard(this)">${todo.heading}
            </div><hr/>
            <ul style = "list-style-type: none;">

            </ul>
            <div class = "icon">
                <i class="fa fa-trash" onclick="trash(this)"></i>
                <i class="fa fa-plus-circle btn" onclick="addItems(this)"></i>  
            </div>`;
            list.append(node);
        }
    }
}

function detailCard(element){
    document.querySelector(".container").classList.add("view");
    document.querySelector(".container-2").classList.add("view");
    document.querySelector(".container-2").classList.remove("blur");
    var valuesCard = document.querySelector(".card-container-2");
    removeAllChildNodes(valuesCard.childNodes[4]);
    var id = element.parentNode.getAttribute("data-key");
    for(var i = 0;i<todoList.length;i++){
        if(todoList[i].id == id){
            document.querySelector(".card-head-text-2").textContent = todoList[i].heading;
            document.querySelector(".head-bold-2").textContent = todoList[i].heading;
            document.querySelector(".card-container-2").setAttribute("data-key",todoList[i].id);
            
            for(var j =0;j<todoList[i].tasks.length;j++){
                var classToText = todoList[i].tasks[j].marked ? "card-item-marked" : "card-item";
                var markDone = todoList[i].tasks[j].marked ? "" : '<button class = "markDone" onclick="markDone(this)">Mark Done</button>'
                var name = `<span class = "text">${todoList[i].tasks[j].name}</span>`;
                var liNode = document.createElement('li');
                liNode.setAttribute("class", classToText);
                liNode.setAttribute("data-key",todoList[i].tasks[j].id);
                liNode.innerHTML =` ${name}${markDone}`;
                valuesCard.childNodes[4].append(liNode);
                
            }
        }
    }
    document.querySelector(".container-2").classList.remove("view");
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function goBack(){
    document.querySelector(".container-2").classList.add("view");
    document.querySelector(".container").classList.remove("view");
}

function initialise(){
    if(todoList.length == 0){
        document.querySelector(".empty-list").classList.remove("view");
    }
}

function trash(element){
    var deleteTodo = element.parentNode.parentNode;
    var id = element.parentNode.parentNode.getAttribute("data-key");
    for(var i = 0;i<todoList.length;i++){
        if(todoList[i].id == id){ 
            list.removeChild(deleteTodo);
            todoList.splice(i,1);
            initialise();
        }
    }
}

function trashCard(element){
    var deleteTodo = element.parentNode.parentNode;
    var id = element.parentNode.parentNode.getAttribute("data-key");
    for(var i = 0;i<todoList.length;i++){   
        if(todoList[i].id == id){
            todoList.splice(i,1); 
        }
    }
    goBack();
    var values = list.getElementsByClassName("card-container");
    for(var j = 0;j<values.length;j++){
        if(values[j].getAttribute("data-key")==id){
            list.removeChild(values[j]);
        }
    }
    initialise();
}

function addItems(element){
    currentClickedItem = element.parentNode.parentNode;
    document.querySelector(".main-head-2").classList.remove("view");
    document.querySelector(".container").classList.add("blur");
    document.querySelector(".container-2").classList.add("blur");
}

function closePopupItem(){
    document.querySelector(".main-head-2").classList.add("view");
    document.querySelector(".container").classList.remove("blur");
    document.querySelector(".container-2").classList.remove("blur");
}

function validateItem(){
    document.querySelector(".main-head-2").classList.add("view");
    document.querySelector(".container").classList.remove("blur");
    document.querySelector(".container-2").classList.remove("blur");
    var id = currentClickedItem.getAttribute("data-key");
    var newListItem = document.getElementById("list-item").value;
    for(var i =0;i<todoList.length;i++){
        if(todoList[i].id == id){
            var todoItem = {
                name : newListItem,
                marked : false,
                id : Date.now()
            }
            todoList[i].tasks.push(todoItem);
            showItems(todoList[i],todoItem);
            if(currentClickedItem.getAttribute("class") == "card-container-2"){
                addItemCard(todoList[i],todoItem);
            }
        }
    }
}

function showItems(listItem,item){
        var currentItem = listItem;
        var mainContainer;
        var id = currentClickedItem.getAttribute("data-key");
        var values = list.getElementsByClassName("card-container");
        for(var j = 0;j<values.length;j++){
            if(values[j].getAttribute("data-key")==id){
                mainContainer = values[j];
            }
        }
        for(var j =0;j<currentItem.tasks.length;j++){
            if(currentItem.tasks[j].id == item.id){
                var classToText = currentItem.tasks[j].marked ? "card-item-marked" : "card-item";
                var markDone = currentItem.tasks[j].marked ? "" : '<button class = "markDone" onclick="markDone(this)">Mark Done</button>'
                var name = `<span class = "text">${currentItem.tasks[j].name}</span>`;
                var liNode = document.createElement('li');
                liNode.setAttribute("class", classToText);
                liNode.setAttribute("data-key",currentItem.tasks[j].id);
                liNode.innerHTML =` ${name}${markDone}`;
                mainContainer.childNodes[4].append(liNode);
            }
            
        }
};

function addItemCard(listItem,item){
    var currentItem = listItem;
    var id = currentClickedItem.getAttribute("data-key");
    for(var j =0;j<currentItem.tasks.length;j++){
        if(currentItem.tasks[j].id == item.id){
            var classToText = currentItem.tasks[j].marked ? "card-item-marked" : "card-item";
            var markDone = currentItem.tasks[j].marked ? "" : '<button class = "markDone" onclick="markDone(this)">Mark Done</button>'
            var name = `<span class = "text">${currentItem.tasks[j].name}</span>`;
            var liNode = document.createElement('li');
            liNode.setAttribute("class", classToText);
            liNode.setAttribute("data-key",currentItem.tasks[j].id);
            liNode.innerHTML =`${name}${markDone}`;
            document.querySelector(".card-container-2").childNodes[4].append(liNode)
        }
        
    }
}

function markDone(element){
    element.parentNode.classList.remove("card-item");
    element.parentNode.classList.add("card-item-marked");
    element.classList.add("view");
     for(var i = 0;i<todoList.length;i++){
        
        for(var j = 0;j < todoList[i].tasks.length;j++){
            
            if(todoList[i].tasks[j].id == element.parentNode.getAttribute("data-key")){
                
                todoList[i].tasks[j].marked = true;
                  if(element.parentNode.parentNode.parentNode.getAttribute("class") == "card-container-2"){
                      console.log("calling")
                    display(todoList[i],todoList[i].tasks[j],element.parentNode.parentNode.parentNode.getAttribute("data-key"));
                  }
                }
            }
        } 
        
}

function display(listItem,item,id){
    var currentItem = listItem;
    var mainContainer;
    var values = list.getElementsByClassName("card-container");
    for(var j = 0;j<values.length;j++){
        if(values[j].getAttribute("data-key")==id){
            mainContainer = values[j];
        }
    } 
    removeAllChildNodes(mainContainer.childNodes[4])
    for(var j =0;j<currentItem.tasks.length;j++){
            var classToText = currentItem.tasks[j].marked ? "card-item-marked" : "card-item";
            var markDone = currentItem.tasks[j].marked ? "" : '<button class = "markDone" onclick="markDone(this)">Mark Done</button>'
            var name = `<span class = "text">${currentItem.tasks[j].name}</span>`;
            var liNode = document.createElement('li');
            liNode.setAttribute("class", classToText);
            liNode.setAttribute("data-key",currentItem.tasks[j].id);
            liNode.innerHTML =` ${name}${markDone}`;
            mainContainer.childNodes[4].append(liNode); 
    }
}
