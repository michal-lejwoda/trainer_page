import axios from 'axios'

const instance = axios.create();
// const DOMAIN = import.meta.env.VITE_DOMAIN

export async function getTrainers() {
    const response = await instance.get(`/api/trainers`);
    let list_of_elements = []
    for (let i = 0; i < response.data.length; i++) {
        list_of_elements.push({
            "id": response.data[i].id,
            "value": response.data[i].id,
            "label": response.data[i].name + ' ' + response.data[i].last_name,
            "name": response.data[i].name,
            "last_name": response.data[i].last_name,
        })
    }
    return list_of_elements;
}

export async function getTrainerPlan(data) {
    const response = await instance.post(`/api/get_trainer_plans`, data);
    let list_of_elements = []
    for (let i = 0; i < response.data.length; i++) {
        list_of_elements.push({
            "currency": response.data[i].currency,
            "id": response.data[i].id,
            "value": response.data[i].id,
            "price": response.data[i].price,
            "label": response.data[i].title + ' (' + response.data[i].price + ' ' + response.data[i].currency + ')',
            "title": response.data[i].title,
            "trainer_id": response.data[i].trainer_id
        })
    }
    return list_of_elements;
}


export async function getDayWorkHours(data) {
    const response = await instance.post(`/api/get_day_work_hours`, data)
    return response.data
}

export async function postReservation(data) {
    const response = await instance.post(`/api/reservation`, data, {withCredentials: true})
    return response.data
}

export async function sendConfirmationEmail(data){
    const response = await instance.post(`/api/send-email/background_task`, data, {withCredentials: true})
    return response.data
}