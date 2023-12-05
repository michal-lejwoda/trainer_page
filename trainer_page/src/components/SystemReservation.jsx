import React, {useEffect, useState} from 'react'
import Calendar from "react-calendar";
import '../css/react-calendar.css'
import {useGetDayWorkHours, useGetTrainerPlan, useGetTrainers} from "./mutations.jsx";
import Select from 'react-select';

import ReservationModal from "./modals/ReservationModal.jsx";


function SystemReservation() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [trainer, setTrainer] = useState(null)
    const [trainerPlan, setTrainerPlan] = useState(null)
    const [selectedPlanHour, setSelectedPlanHour] = useState(null)
    const [show, setShow] = useState(false);

    console.log("trainer")
    console.log(trainer)
    console.log("trainerPlan")
    console.log(trainerPlan)
    console.log("selectedPlanHour")
    console.log(selectedPlanHour)



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const minDate = new Date()
    const number_of_months = 1
    const maxDate = addMonths(minDate, number_of_months);


    // const openModal = () => {
    //     console.log("open modal")
    //     setIsOpen(true);
    // }
    //
    // const closeModal = () => {
    //     console.log("close modal")
    //     setIsOpen(false);
    // }

    const handleCalendarDateChange = (date) => {
        setCurrentDate(date)
        if (trainer !== null && trainerPlan !== null) {
            const work_hours_args = {
                "trainer_id": trainerPlan.id, "is_active": true,
                "day": date.toISOString().split('T')[0]
            }
            mutateWorkHoursData(work_hours_args)
        }
    }

    const handleTrainerDataChange = (trainer_data) => {
        setTrainer(trainer_data)
        // setTrainerPlan(null)
        setSelectedPlanHour(null)

        mutatePlanData({"trainer_id": trainer_data.id}, {
            onSuccess: (plan_data) => {
                if (plan_data.length > 0) {
                    setTrainerPlan(plan_data[0])
                    const work_hours_args = {
                        "trainer_id": plan_data[0].id, "is_active": true,
                        "day": currentDate.toISOString().split('T')[0]
                    }
                    mutateWorkHoursData(work_hours_args)
                } else {
                    setTrainerPlan(null)
                }
            }
        })

    }


    useEffect(() => {
        mutateTrainersData(undefined, {
            onSuccess: (data) => {
                if (data.length > 0) {
                    setTrainer(data[0])
                    mutatePlanData({"trainer_id": data[0].id}, {
                        onSuccess: (plan_data) => {
                            if (plan_data.length > 0) {
                                setTrainerPlan(plan_data[0])
                                const work_hours_args = {
                                    "trainer_id": plan_data[0].id, "is_active": true,
                                    "day": currentDate.toISOString().split('T')[0]
                                }
                                mutateWorkHoursData(work_hours_args)
                            } else {
                                setTrainerPlan(null)
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
        let selected_hour_dict = {"plan": trainerPlan, "time_data": data, "trainer": trainer}
        setSelectedPlanHour(selected_hour_dict)
    }

    const handleBookAnAppointment = () => {
        if (trainer !== null && trainerPlan !== null && selectedPlanHour !== null){
            setShow(true);
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
                <div className="reservation--title my-5">
                    <h1>Rezerwacja treningu</h1>
                </div>
                <div>
                    <label htmlFor="trainers"
                           className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Wybierz
                        Trenera</label>
                    {trainersData &&
                        <Select
                            defaultValue={trainer}
                            onChange={handleTrainerDataChange}
                            options={trainersData}
                        />
                    }
                    <label htmlFor="trainers"
                           className="block my-2 text-lg font-semibold text-gray-900 dark:text-white">Wybierz
                        Plan</label>
                    {trainerPlanData &&
                        <Select
                            defaultValue={trainerPlan}
                            options={trainerPlanData}
                        />
                    }

                    <Calendar prev2Label={null} next2Label={null} view={"month"} minDate={minDate}
                              maxDate={maxDate}
                              onChange={handleCalendarDateChange}
                              value={currentDate}/>
                    <div className="mt-5 text-lg font-semibold">
                        <h2>Dostępne Terminy:</h2>
                    </div>
                    <div className="term__container w-full">
                        {dayWorkHoursData && dayWorkHoursData.map(element => {
                            return (
                                <button key={element.id} onClick={(e) => selectHour(e, element)}
                                        className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                                    {element.start_time} - {element.end_time}
                                </button>)
                        })}
                    </div>
                    <div className="flex flex-row justify-center">
                        <button onClick={handleBookAnAppointment}
                            className="bg-transparent hover:bg-blue-500 text-white-700 font-bold hover:text-white py-2 px-4 border border-blue-500 mb-4 hover:border-transparent rounded">
                            Zarezerwuj termin
                        </button>
                    </div>
                </div>
            </div>
            {show && <ReservationModal show={show} handleClose={handleClose} selectedPlanHour={selectedPlanHour} />}
        </>
    )
}

export default SystemReservation
