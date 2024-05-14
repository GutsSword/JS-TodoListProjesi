// Tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");

let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",RemoveToDo);
    clearButton.addEventListener("click",RemoveAllTodos);
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText=="")
    {
        showAlert("warning","Lütfen Bir Değer Giriniz.") 
    }
    else
    {
        //Arayüze Ekleme
        AddTodoUI(inputText);
        //Storage Ekleme
        AddToDoStorage(inputText);
        //Bilgilendirme Mesajları
        showAlert("success","Listeye Eklendi.")
    }
    console.log("Submit aksiyonu çalıştı.")
    e.preventDefault();
}

function AddTodoUI(newTodo){

    const li  = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value="";
}

function AddToDoStorage(newTodo){
    CheckToDosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function CheckToDosFromStorage(){

    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    /*
    <div class="alert alert-warning" role="alert">Message</div>
    */
   const div = document.createElement("div");
   div.className="alert alert-"+type;
   div.textContent = message;

   firstCardBody.appendChild(div);

   //Mesajı Kaldırma
   setTimeout(function(){
        div.remove();
   },1000)
}

function pageLoaded(){
    CheckToDosFromStorage();
    todos.forEach(function(item){
        AddTodoUI(item);
    })
}

function RemoveToDo(e){
    if(e.target.className=="fa fa-remove"){
        // Ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storageden silme
        removeTodoStorage(todo.textContent);
        showAlert("succes", "Todo Başarıyla Silindi.");
    }
}

function removeTodoStorage(removeToDo){
    CheckToDosFromStorage();
    todos.forEach(function(item,index){
        if(removeToDo===item){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function RemoveAllTodos(){
    const allTodolist = document.querySelectorAll(".list-group-item");
    //Ekrandan Silme
    if(allTodolist.length>0){
        allTodolist.forEach(function(item){
            item.remove();
            showAlert("success", "Silme işlemi başarılı.");
        })
    }else{
        showAlert("warning", "Silinecek bir görev yok.");
    }
    //Storageden Silme
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
}
