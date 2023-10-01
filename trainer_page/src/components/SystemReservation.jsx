import {useState} from 'react'
import Calendar from "react-calendar";
// import moment from "moment/moment.js";
import '../css/react-calendar.css'

function SystemReservation() {
    const [value, onChange] = useState(new Date());
    const minDate = new Date()
    const selectHour = (e) => {
        console.log("selected hour")
        console.log(e)
    }

    function addMonths(date, months) {
        let date_with_added_months = new Date()
        date_with_added_months.setMonth(date.getMonth() + months);
        return date_with_added_months;
    }

    const number_of_months = 1
    const maxDate = addMonths(minDate, number_of_months);
    return (
        <div className="px-4">
            <div className="reservation--title my-5">
                <h1>Rezerwacja treningu</h1>
            </div>
            <div>
                <label htmlFor="trainers" className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Wybierz
                    Trenera</label>
                <select id="trainers"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="US">Michał</option>
                    <option value="CA">Robert</option>
                    <option value="FR">Tomasz</option>
                    <option value="DE">Jarek</option>
                </select>

                <label htmlFor="schedule"
                       className="block mb-2 text-lg my-5 font-semibold text-gray-900 dark:text-white">Wybierz
                    plan</label>
                <select id="schedule"
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Trening 60 minut(150 zł)</option>
                    <option>Trening 120 minut(180 zł)</option>
                    <option>Konsultacja 20 minut(80 zł)</option>
                    <option>Trening grupowy dla 2-4 osób 60 minut(200 zł)</option>
                    <option>Trening grupowy dla 2-4 osób 120 minut(250 zł)</option>
                </select>

                <Calendar prev2Label={null} next2Label={null} view={"month"} minDate={minDate}
                          maxDate={maxDate}
                          onChange={onChange} value={value}/>
                <div className="mt-5 text-lg font-semibold">
                    <h2>Dostępne Terminy:</h2>
                </div>
                <div className="term__container w-full">

                    <button onClick={selectHour}
                            className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                        14:00
                    </button>
                    <button onClick={selectHour}
                            className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                        15:00
                    </button>
                    <button onClick={selectHour}
                            className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                        16:00
                    </button>
                    <button onClick={selectHour}
                            className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                        17:00
                    </button>
                    <button onClick={selectHour}
                            className="bg-transparent hover:bg-lighter-grey text-white-700 mx-5 my-5 font-semibold hover:text-white py-2 px-4 border-3 border-darky-grey hover:border-transparent rounded-lg">
                        18:00
                    </button>
                </div>
                <div className="flex flex-row justify-center">
                    <button
                        className="bg-transparent hover:bg-blue-500 text-white-700 font-bold hover:text-white py-2 px-4 border border-blue-500 mb-4 hover:border-transparent rounded">
                        Zarezerwuj termin
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SystemReservation
