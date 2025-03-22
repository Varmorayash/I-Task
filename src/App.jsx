import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

useEffect(() => {
  let todoString =  localStorage.getItem("todos")
  if(todoString){

    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
}, [])


  const savToLS =(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinished =(e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handalEdit = (e,id)=>{
   let t = todos.filter(i=>i.id === id)
   setTodo(t[0].todo)
   let newTodos =todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  savToLS()
  }

  const handalDelete = (e,id)=>{
  let newTodos =todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  savToLS()
  }
  const handalAdd = ()=>{
   setTodos([...todos, {id:uuidv4(),todo, isComplated:false}])
   setTodo("")
   savToLS()
  }
  const handalchange = (e)=>{
   setTodo(e.target.value)

  }
const handleCheckbox = (e) => {
  let id= e.target.name;
  console.log(`the id is${id }`)
  let index = todos.findIndex(item=>{
    return item.id === id
  })
  console.log(index)
  let newTodos =[ ...todos];
  newTodos[index].isComplated = !newTodos[index].isComplated;
  setTodos(newTodos)
  savToLS()
}

  
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input onChange={handalchange} value={todo} type="text" className="w-full rounded-lg px-3 py-1" />
          <button onClick={handalAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-900 disabled:bg-violet-600 p-2 py-1 text-sm text-white rounded-md ">Save</button>
        </div>
       <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-xl font-bold">Your Todos </h2>
        <div className="todos">
          {todos.length ===0 && <div className="m-5">No Todos to display</div>} 
          {todos.map(item=>{
         return (showFinished || !item.isComplated ) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
          <div  className="flex gap-5"> 
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplated}id="" />
            <div className={item.isComplated?"line-through":"" }>{item.todo} </div>
          </div>
            <div className="button flex h-full">
              <button onClick={(e)=>handalEdit(e,item.id)} className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm text-white rounded-md mx-1"><FaEdit /></button>
              <button onClick={(e)=>{handalDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm text-white rounded-md mx-1"><AiFillDelete />
              </button>
            </div>
 
          </div>
           })}
        </div>

      </div>
    </>
  );
}

export default App;
