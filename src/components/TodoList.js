
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { signOut } from "../services/users.service";
import Swal from 'sweetalert2';
import { todos, deleteTodo } from "./../services/todos.service.js";

import TodoItem from "./TodoItem";
import AddNewTodo from "./AddNewTodo";
import EmptyMsg from "./EmptyMsg";


function TodoList(){
    let navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [todoState, setTodoState] = useState("all");
    const [msg, setMsg] = useState("");
    const [todo ,setTodo] = useState([]);
    const [states] = useState([
        {
          todoState: "all",
          content: "全部"
        },
        {
          todoState: "active",
          content: "待完成"
        },
        {
          todoState: "completed",
          content: "已完成"
        }
      ]);

    const logout = async(e) => {
        e.preventDefault();
        await signOut().then((response)=>{
            console.log(response);
            localStorage.clear();
            Swal.fire(response.data?.message,'','success');
            navigate('/',{replace: true});
        })

    }

    const getTodo = async()=>{
        await todos().then((response)=>{
            console.log(response);
            setTodo(response.data?.todos)
        })
        .catch( (error) => { 
            console.log(error);
            Swal.fire(error.response?.data?.message, "", 'error');
        });
    }

    const filterTodo = ()=>{
        if (todoState === "completed")
            return todo.filter((item) => item.completed_at);
        else if (todoState === "active")
            return todo.filter((item) => !item.completed_at);
        else return todo;
    }

    const changeState = (e, item) => {
        e.preventDefault();
        setTodoState(item.todoState);
    }

    const clearAll = (e)=>{
        e.preventDefault();
        Swal.fire({
            title: '確定要清除已完成項目?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '確認',
            cancelButtonText: '取消',
        }).then((result) => {
            if (result.isConfirmed) {
                removeTodos();
                Swal.fire('清除成功!', '', 'success');
            }
        });
    }

    const removeTodos = async () => {
        const needDeletes = todo.filter((item) => item.completed_at).map(item => {
            return new Promise(async resolve => {
                await removeTodo(item, "many");
                resolve();
            });
        });
        await Promise.all(needDeletes);
        getTodo();
    }

    const removeTodo = async(item, deleteType = "single") => {
        await deleteTodo(item.id).then( (response) => {
            console.log(response);
            if(deleteType === "single") {
                getTodo();
                Swal.fire(response.data?.message, '', 'success');
            }
        })
        .catch( (error) => { 
            console.log(error);
            Swal.fire(error.response?.data?.message, "", 'error');
        });
    }


    useEffect(() => {
        getTodo();
    }, []);

    return(
        <>
            <div id="todoListPage" className="bg-half">
                <nav>
                    <h1><a href="/#">ONLINE TODO LIST</a></h1>
                    <ul>
                        <li className="todo_sm"><a href="/#"><span>{user.nickname} 的代辦</span></a></li>
                        <li><a href="/" onClick={(e)=> logout(e)}>登出</a></li>
                    </ul>
                </nav>
                <div className="conatiner todoListPage vhContainer">
                    <div className="todoList_Content">
                        <AddNewTodo msg={msg} setMsg={setMsg} getTodo={getTodo}/>
                        {
                            todo.length > 0 ?
                            (
                                <div className="todoList_list">
                                    <ul className="todoList_tab">
                                    {states.map((item,i)=>{
                                        return(
                                            <li key={i}><a href="/#" className={todoState === item.todoState ? "active" : ""} onClick={(e) => changeState(e, item)}>{item.content}</a></li>
                                        )
                                    })}
                                    </ul>
                                    <div className="todoList_items">
                                        <ul className="todoList_item">
                                            {filterTodo().map((item,i)=>{
                                                return (
                                                    <li key={i}>
                                                        <TodoItem item={item} todo={todo} setTodo={setTodo} getTodo={getTodo} removeTodo={removeTodo}/>
                                                    </li>
                                                )
                                            })}
                                            
                                        </ul>
                                        <div className="todoList_statistics">
                                            <p>{todo.filter((item) => item.completed_at).length}  個已完成項目</p>
                                            <a href="/#" onClick={(e) => clearAll(e) }>
                                                清除已完成項目
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ):
                            (
                                <EmptyMsg/>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;