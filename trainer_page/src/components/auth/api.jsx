import axios from 'axios'

const instance = axios.create();


export async function checkIfUserLogged() {
    const response = await instance.get(`http://0.0.0.0:8000/users/me/`, {
        withCredentials: true
    });
    return response.data
}


export async function getLogin(form) {
    const response = await instance.post(`http://0.0.0.0:8000/token`, form);
    return response.data


}

export async function postRegistration(form) {
    const response = await instance.post(`http://0.0.0.0:8000/register_user`, form);
    console.log("response register")
    console.log(response)
    return response.data
}