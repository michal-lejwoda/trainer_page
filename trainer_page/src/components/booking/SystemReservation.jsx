import React, {useEffect, useState} from 'react'
import Calendar from "react-calendar";
import '../../css/react-calendar.css'
import {useGetDayWorkHours, useGetNextAvailableDayWorkHours, useGetTrainerPlan, useGetTrainers} from "../mutations.jsx";
import Select from 'react-select';
import {useAuth} from "../auth/AuthContext.jsx";
import {useTranslation} from "react-i18next";


function SystemReservation(props) {
    const {t} = useTranslation()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayWorkHoursData, setDayWorkHoursData] = useState([]);
    const {authUser} = useAuth()
    const minDate = new Date()
    const number_of_months = 1
    const maxDate = addMonths(minDate, number_of_months);

    const {
        data: trainersData,
        mutate: mutateTrainersData,
    } = useGetTrainers()

    const {
        data: trainerPlanData,
        mutate: mutatePlanData
    } = useGetTrainerPlan()


    const {
        mutate: mutateWorkHoursData,
    } = useGetDayWorkHours()

    const {
        mutate: mutateNextAvailableDayWorkHours
    } = useGetNextAvailableDayWorkHours()


    const handleCalendarDateChange = (date) => {
        date.setHours(12)
        props.setSelectedPlanHour(null)
        setCurrentDate(date)
        if (props.trainer !== null && props.trainerPlan !== null) {
            const work_hours_args = {
                "trainer_id": props.trainer.id,
                "is_active": true,
                "date": date.toISOString().split('T')[0]
            }
            mutateWorkHoursData(work_hours_args, {
                onSuccess: (data) => {

                    setDayWorkHoursData(data);

                }
            });
        }
    }

    const handleTrainerDataChange = (trainer_data) => {
        props.setTrainer(trainer_data)
        props.setSelectedPlanHour(null)
        mutatePlanData({"trainer_id": trainer_data.id}, {
            onSuccess: (plan_data) => {
                if (plan_data.length > 0) {
                    props.setTrainerPlan(plan_data[0])
                    const work_hours_args = {
                        "trainer_id": plan_data[0].id, "is_active": true,
                        "day": currentDate.toISOString().split('T')[0]
                    }
                    mutateWorkHoursData(work_hours_args, {
                        onSuccess: (data) => {
                            setDayWorkHoursData(data);
                        }
                    });
                } else {
                    props.setTrainerPlan(null)
                }
            }
        })

    }

    // TODO Check plan and trainer
    useEffect(() => {
    mutateTrainersData(undefined, {
        onSuccess: (data) => {
            if (data.length > 0) {
                props.setTrainer(data[0]);
                const formattedDate = new Date(maxDate).toISOString().slice(0, 10);

                mutatePlanData({"trainer_id": data[0].id}, {
                    onSuccess: (plan_data) => {
                        if (plan_data.length > 0) {
                            props.setTrainerPlan(plan_data[0]);
                            mutateNextAvailableDayWorkHours({"id": data[0].id, "max_date": formattedDate}, {
                                onSuccess: (nextAvailableData) => {
                                    if (nextAvailableData.length > 0) {
                                        const availableDate = nextAvailableData[0].date;
                                        if (availableDate) {
                                            const isoDateString = new Date(`${availableDate}T00:00:00`).toISOString();
                                            setCurrentDate(new Date(isoDateString));
                                            setDayWorkHoursData(nextAvailableData);
                                        }
                                    }
                                },
                                onError: (error) => {
                                    console.error("Błąd przy pobieraniu najbliższych dostępnych godzin pracy:", error);
                                }
                            });
                        } else {
                            props.setTrainerPlan(null);
                        }
                    },
                    onError: (error) => {
                        console.error("Błąd przy pobieraniu planu trenera:", error);
                    }
                });
            }
        },
        onError: (error) => {
            console.error("Błąd przy pobieraniu danych trenerów:", error);
        }
    });
}, []);


    const selectHour = (e, data) => {
        let selected_hour_dict = {"plan": props.trainerPlan, "time_data": data, "trainer": props.trainer}
        props.setSelectedPlanHour(selected_hour_dict)
        let selected_element = document.getElementsByClassName("bg-blue-500")
        for (let i = 0; i < selected_element.length; i++) {
            let temp_red = selected_element[i]
            temp_red.classList.remove("bg-blue-500")
            temp_red.classList.add("bg-transparent")
        }
        e.target.classList.remove("bg-transparent")
        e.target.classList.add("bg-blue-500")
    }

    const handleReservation = () => {
        if (authUser === null) {
            return props.goToBookingAuthorization()
        }
        if (props.trainer !== null && props.trainerPlan !== null && props.selectedPlanHour !== null) {
            return props.goToBookingConfirmation()
        }
    }

    function addMonths(date, months) {
        let date_with_added_months = new Date()
        date_with_added_months.setMonth(date.getMonth() + months);
        return date_with_added_months;
    }

    return (
        <>
            <div className="px-4 text-white">
                <div className="reservation--title my-5 text-center">
                    <h1 className="text-white">{t("Training Reservation")}</h1>
                </div>
                <div className="reservation__container mx-5">
                    <label htmlFor="trainers"
                           className="block mb-4 text-xl font-semibold text-gray-900 dark:text-white text-white">{t("Select Trainer")}</label>
                    {trainersData &&
                        <div>
                            <Select
                                defaultValue={props.trainer}
                                styles={{
                                    option: (base) => ({
                                        ...base,
                                        color: `black`,
                                    }),
                                }}
                                onChange={handleTrainerDataChange}
                                options={trainersData}
                            />
                        </div>
                    }
                    <label htmlFor="trainers"
                           className="block my-4 text-xl font-semibold text-gray-900 dark:text-white text-white">{t("Select Plan")}</label>
                    {trainerPlanData &&
                        <Select
                            defaultValue={props.trainerPlan}
                            options={trainerPlanData}
                            styles={{
                                option: (base) => ({
                                    ...base,
                                    color: `black`,
                                }),
                            }}
                        />
                    }

                    <Calendar prev2Label={null} next2Label={null} view={"month"} minDate={minDate}
                              maxDate={maxDate}
                              onChange={handleCalendarDateChange}
                              value={currentDate}
                              minDetail="month"
                              maxDetail="month"
                    />
                    <div className="mt-5 mb-5 text-lg font-semibold">
                        <h2 className="text-center text-white">{t("Available booking slots")}:</h2>
                    </div>
                    <div className="term__container w-full text-center">
                        {dayWorkHoursData && dayWorkHoursData.map(element => {
                            return (
                                <button key={element.id} onClick={(e) => selectHour(e, element)}
                                        className="bg-transparent hover:bg-blue-300 text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg text-white">
                                    {element.start_datetime} - {element.end_datetime}
                                </button>)
                        })}
                    </div>
                    <div className="flex flex-row justify-center">
                        {props.selectedPlanHour &&
                            <button onClick={handleReservation}
                                    className="bg-transparent hover:bg-blue-500 text-white-700 font-bold hover:text-white py-2 px-4 border border-blue-500 mb-4 hover:border-transparent rounded">
                                {t("Book an appointment")}
                            </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SystemReservation
