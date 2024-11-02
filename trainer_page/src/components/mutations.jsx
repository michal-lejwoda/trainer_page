import {useMutation} from "react-query";
import {
    getDayWorkHours,
    getNextAvailableDayWorkHours,
    getTrainerPlan,
    getTrainers,
    getUserReservations
} from "./api.jsx";

export const useGetTrainers = () => {
    return useMutation(getTrainers)
}

export const useGetTrainerPlan = () =>{
    return useMutation(getTrainerPlan)
}

export const useGetDayWorkHours = () =>{
    return useMutation(getDayWorkHours)
}

export const useGetNextAvailableDayWorkHours = () =>{
    return useMutation(getNextAvailableDayWorkHours)
}

export const useGetUserReservations = () => {
    return useMutation(getUserReservations)
}