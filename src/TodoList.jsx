import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList(){
    let [todos,setTodos]=useState([{task:"sample-task",id:uuidv4(),isDone:false}]);
    let [newTodo,setNewTodo] = useState("");

    let styles={
        textDecorationLine:"line-through",
    };

    let addNewTask =()=>{
        setTodos((prev)=>{
            return [...prev,{task:newTodo,id:uuidv4(),isDone:false}];
        })
        setNewTodo("");
    };

    let updateTodoValue = (event)=>{
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id)=>{
        setTodos((prev) =>todos.filter((prev)=> prev.id != id));
    };

    let isDone = (id)=>{
        setTodos((prev)=> prev.map((todo)=>{
            if(todo.id == id)
            {
                return {...todo,isDone:true};
            }else{
                return todo;
            }
        }));
    };

    let upperCaseAll = ()=>{
        setTodos((prev)=> prev.map((todo)=>{
            return {...todo,task:todo.task.toUpperCase()};
        }));
    };

    let upperCaseOne = (id)=>{
        setTodos((prev)=> prev.map((todo)=>{
            if(todo.id == id)
            {
                return {...todo,task:todo.task.toUpperCase()};
            }else{
                return todo;
            }
        }));
    }

    return (
        <div>
            <input placeholder="add a task" value={newTodo} onChange={updateTodoValue}></input>
            <br/>
            <button onClick={addNewTask}>Add Task</button>
            <br/><br/><br/><br/>
            <hr/>
            <h4>Tasks to do</h4>
            <ul>
                {
                    todos.map((todo)=>{
                        return <li key={todo.id}>
                            { todo.isDone==true ? <span style={styles}>{todo.task}</span> :<span>{todo.task}</span>}
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                            <button onClick={()=>upperCaseOne(todo.id)}>UpperCase One</button>
                            <button onClick={()=>isDone(todo.id)}>Completed</button>
                        </li>;
                    })
                }
            </ul>
            <br/><br/>
            <button onClick={upperCaseAll}>Upper Case All</button>
        </div>
    );
}