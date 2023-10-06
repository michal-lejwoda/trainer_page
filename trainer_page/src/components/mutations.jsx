import {useMutation} from "react-query";
import {getTrainerPlan, getTrainers} from "./api.jsx";

export const useGetTrainers = () => {
    return useMutation(getTrainers)
}

export const useGetTrainerPlan = () =>{
    return useMutation(getTrainerPlan)
}