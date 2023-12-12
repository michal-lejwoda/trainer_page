import React, {useEffect, useState} from 'react'
import Calendar from "react-calendar";
import '../../css/react-calendar.css'
import {useGetDayWorkHours, useGetTrainerPlan, useGetTrainers} from "../mutations.jsx";
import Select from 'react-select';
import {useAuth} from "../auth/AuthContext.jsx";



function SystemReservation(props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()


    const minDate = new Date()
    const number_of_months = 1
    const maxDate = addMonths(minDate, number_of_months);


    const handleCalendarDateChange = (date) => {
        setCurrentDate(date)
        if (props.trainer !== null && props.trainerPlan !== null) {
            const work_hours_args = {
                "trainer_id": props.trainerPlan.id, "is_active": true,
                "day": date.toISOString().split('T')[0]
            }
            mutateWorkHoursData(work_hours_args)
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
                    mutateWorkHoursData(work_hours_args)
                } else {
                    props.setTrainerPlan(null)
                }
            }
        })

    }


    useEffect(() => {
        mutateTrainersData(undefined, {
            onSuccess: (data) => {
                if (data.length > 0) {
                    props.setTrainer(data[0])
                    mutatePlanData({"trainer_id": data[0].id}, {
                        onSuccess: (plan_data) => {
                            if (plan_data.length > 0) {
                                props.setTrainerPlan(plan_data[0])
                                const work_hours_args = {
                                    "trainer_id": plan_data[0].id, "is_active": true,
                                    "day": currentDate.toISOString().split('T')[0]
                                }
                                mutateWorkHoursData(work_hours_args)
                            } else {
                                props.setTrainerPlan(null)
                            }
                        }
                    })
                }

            }
        })
    }, [])


    const {
        data: trainersData,
        mutate: mutateTrainersData,
    } = useGetTrainers()


    const {
        data: trainerPlanData,
        mutate: mutatePlanData
    } = useGetTrainerPlan()


    const {
        data: dayWorkHoursData,
        mutate: mutateWorkHoursData
    } = useGetDayWorkHours()

    const selectHour = (e, data) => {
        let selected_hour_dict = {"plan": props.trainerPlan, "time_data": data, "trainer": props.trainer}
        props.setSelectedPlanHour(selected_hour_dict)
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
            <div className="px-4 test">
                <div className="reservation--title my-5 text-center">
                    <h1>Rezerwacja treningu</h1>
                </div>
                <div className="reservation__container mx-5">
                    <label htmlFor="trainers"
                           className="block mb-4 text-xl font-semibold text-gray-900 dark:text-white">Wybierz
                        Trenera</label>
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
                           className="block my-4 text-xl font-semibold text-gray-900 dark:text-white">Wybierz
                        Plan</label>
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
                              value={currentDate}/>
                    <div className="mt-5 text-lg font-semibold">
                        <h2 className="text-center">Dostępne Terminy:</h2>
                    </div>
                    <div className="term__container w-full text-center">
                        {dayWorkHoursData && dayWorkHoursData.map(element => {
                            return (
                                <button key={element.id} onClick={(e) => selectHour(e, element)}
                                        className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                                    {element.start_time} - {element.end_time}
                                </button>)
                        })}
                    </div>
                    <div className="flex flex-row justify-center">
                        <button onClick={handleReservation}
                                className="bg-transparent hover:bg-blue-500 text-white-700 font-bold hover:text-white py-2 px-4 border border-blue-500 mb-4 hover:border-transparent rounded">
                            Zarezerwuj termin
                        </button>
                    </div>
                </div>
            </div>
            {/*{show && <ReservationModal show={show} handleClose={handleClose} selectedPlanHour={selectedPlanHour} />}*/}
        </>
    )
}

export default SystemReservation
