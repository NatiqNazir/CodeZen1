const $insert = document.getElementById("insert")
const $key = document.getElementById("key")
const $listchild = document.getElementById("listchild")
const $btn22 = document.getElementById("btn22")
 const toaster = new ToasterUi();
$key.addEventListener("click",addToDo)


const clg = (...args) => console.log(...args) //making small function name for console.log()

let todo = []

function addToDo(){

  if($insert.value == ""){
      toaster.addToast("Error: Add To Do","error",{
        duration: 30000,
          styles: {
            borderRadius:"10px",
            padding:"10px 20px",
            border:"none"
          }});
    return
  }
 

  let task = {
    title :$insert.value,
    checked : false,
    checkedAt: new Date(Date.now()),
    id: Date.now() //32423423423423
  }
  
  todo.unshift(task)
  
  $listchild.innerHTML += `<li id="li${task.id}" >${task.title}<button class="btn22" onclick="todoDelete('${task.id}')"><i class="bi bi-x"></i></button></li> `
  
  $insert.value = ""
 addStorage()
}


function todoDelete(id){ //id string
  const ele = document.getElementById("li" + id)
  ele.remove()

  const taskId = parseInt(id)  // now taskID is number
  const index = todo.findIndex((obj)=>{
    return obj.id === taskId 
  })
  
  //index can either be index of element or -1
  if(index != -1){ //return here after complete
    todo.splice(index,1)
  }
  // clg("after delete",todo)
 addStorage()
}




let addStorage = () => {
  localStorage.setItem("todos",JSON.stringify(todo))
}


function initialRender(){
  const lsValue = JSON.parse(localStorage.getItem("todos"))
  if(!lsValue) return
  todo = lsValue
  todo.forEach((task)=>{
    $listchild.innerHTML += `<li id="li${task.id}" >${task.title}<button class="btn22" onclick="todoDelete('${task.id}')"><i class="bi bi-x"></i></button></li> `
  })
}
initialRender()

