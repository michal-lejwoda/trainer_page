import axios from 'axios'

const instance = axios.create();


export async function checkIfUserLogged(){
    const response = await instance.get(`http://0.0.0.0:8000/users/me/`, { withCredentials: true });
    console.log(response.data)
    return response.data
}


export async function getLogin(form) {
    console.log("form")
    console.log(form)
    const response = await instance.post(`http://0.0.0.0:8000/token`, form);
    console.log(response.data)
    return response.data
}