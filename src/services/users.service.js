import axios from 'axios';
const API_URL = "https://todoo.5xcamp.us/users";

export const signIn = (data) =>{
    return axios({
        heades: {
            Accept: 'application/json',
            'Content-Type': 'application/json', 
        },
        method:'post',
        url: API_URL + '/sign_in',
        data
    });
}

export const signOut = (data) =>{
    return axios({
        headers: { Authorization: localStorage.getItem('token') },
        method: 'delete',
        url: API_URL + "/sign_out",
    });
}

export const user_singup = (data) =>{
    return axios({
        method: 'post',
        url: API_URL,
        data: data
      });
}