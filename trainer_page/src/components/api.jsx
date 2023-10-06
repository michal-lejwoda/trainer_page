import axios from 'axios'
import {list} from "postcss";

const instance = axios.create();


export async function getTrainers() {
    const response = await instance.get(`http://0.0.0.0:8000/trainers`);
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
    const response = await instance.post(`http://0.0.0.0:8000/get_trainer_plans`, data);
    return response.data;
}