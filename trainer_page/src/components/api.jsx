import axios from 'axios'

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


export async function getDayWorkHours(data){
    const response = await instance.post(`http://0.0.0.0:8000/get_day_work_hours`, data)
    return response.data
}