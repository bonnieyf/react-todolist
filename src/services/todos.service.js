import axios from 'axios';
const API_URL = "https://todoo.5xcamp.us/todos";

export const todos = ( ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'get',
    url: API_URL,
  });
}

export const addTodo = ( data ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'post',
    url: API_URL,
    data: data,
  });
}

export const toggleTodo = ( id ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'patch',
    url: API_URL + `/${id}/toggle`,
  });
}


export const deleteTodo = ( id ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'delete',
    url: API_URL + `/${id}`,
  });
}