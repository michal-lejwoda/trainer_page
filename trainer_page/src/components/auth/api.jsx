import axios from 'axios'

const instance = axios.create();
const DOMAIN = import.meta.env.VITE_DOMAIN


export async function checkIfUserLogged() {
    const response = await instance.get(`/api/users/me`, {
        withCredentials: true
    });
    return response.data
}


export async function getLogin(form) {
    const response = await instance.post(`/api/token`, form);
    return response.data


}

export async function postRegistration(form) {
    const response = await instance.post(`/api/register_user`, form);
    return response.data
}

export async function postSendResetPassword(form){
    const response = await instance.post(`/api/send_reset_password_on_email`, form);
    return response
}

export async function postResetPassword(form){
    const response = await instance.post(`/api/reset_password`, form);
    return response
}

export async function postGetUser(form){
    const response = await instance.post(`/api/get_user`, form);
    return response.data
}

export async function postMessageFromUser(form){
    const response = await instance.post(`/api/send_direct_message`, form);
    return response
}