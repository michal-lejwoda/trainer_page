import {useMutation} from "react-query";
import {getDayWorkHours, getTrainerPlan, getTrainers} from "./api.jsx";

export const useGetTrainers = () => {
    return useMutation(getTrainers)
}

export const useGetTrainerPlan = () =>{
    return useMutation(getTrainerPlan)
}

export const useGetDayWorkHours = () =>{
    return useMutation(getDayWorkHours)
}