import axios from 'axios'

const instance = axios.create();
const DOMAIN = import.meta.env.VITE_DOMAIN

export async function checkIfUserLogged() {
    const response = await instance.get(`${DOMAIN}/users/me/`, {
        withCredentials: true
    });
    return response.data
}


export async function getLogin(form) {
    const response = await instance.post(`${DOMAIN}/token`, form);
    return response.data


}

export async function postRegistration(form) {
    const response = await instance.post(`${DOMAIN}/register_user`, form);
    return response.data
}

export async function postSendResetPassword(form){
    const response = await instance.post(`${DOMAIN}/send_reset_password_on_email`, form);
    return response
}

export async function postResetPassword(form){
    const response = await instance.post(`${DOMAIN}/reset_password`, form);
    return response
}

export async function postGetUser(form){
    const response = await instance.post(`${DOMAIN}/get_user`, form);
    return response.data
}

export async function postMessageFromUser(form){
    const response = await instance.post(`${DOMAIN}/send_direct_message`, form);
    return response
}