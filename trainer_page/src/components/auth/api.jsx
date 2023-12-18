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
    return response.data
}

export async function postSendResetPassword(form){
    const response = await instance.post('http://0.0.0.0:8000/send_reset_password_on_email', form);
    return response
}

export async function postResetPassword(form){
    const response = await instance.post('http://0.0.0.0:8000/reset_password', form);
    return response
}

export async function postGetUser(form){
    const response = await instance.post('http://0.0.0.0:8000/get_user', form);
    return response.data
}

export async function postMessageFromUser(form){
    const response = await instance.post('http://0.0.0.0:8000/send_direct_message', form);
    return response
}