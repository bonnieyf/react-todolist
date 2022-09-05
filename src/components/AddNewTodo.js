import Swal from 'sweetalert2';
import { addTodo } from "../services/todos.service";

function AddNewTodo({msg,setMsg,getTodo}){
    const submitTodo = async(e) =>{
        e.preventDefault();
        if(msg === ''){
            Swal.fire('請輸入代辦事項內容!', '', 'error');
        }else{
            setMsg('');
            let item = {todo :{content: msg}};
            await addTodo(item).then((response)=>{
                getTodo();
                Swal.fire('新增成功!', '', 'success');
            })
            .catch( (error) => { 
                console.log(error.response);
                Swal.fire(error.response?.data?.message, error.response?.data?.error, 'error');
              });
        }
    }
    return(
        <>
            <div className="inputBox">
                <input type="text" placeholder="請輸入待辦事項" value={msg} onChange={(e)=> setMsg(e.target.value)}/>
                <a href="/#" onClick={(e)=> submitTodo(e)}>
                    <i className="fa fa-plus"></i>
                </a>
            </div>
        </>
    )
}

export default AddNewTodo;