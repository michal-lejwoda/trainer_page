import React, {useEffect, useState} from 'react';
import {useGetUserReservations} from "./mutations.jsx";
import BoxLoading from "./BoxLoading.jsx";
import {faArrowDown} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const AccountOrders = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {mutateAsync: mutateGetUserReservations} = useGetUserReservations();
    const [expandedOrderIds, setExpandedOrderIds] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation()
    const handlePayment = () =>{
        // #TODO STARTS HERE
        console.log("handlePayment")
        navigate("/login")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await mutateGetUserReservations();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error details:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [mutateGetUserReservations]);

    const toggleOrder = (orderId) => {
        setExpandedOrderIds(prevState =>
            prevState.includes(orderId)
                ? prevState.filter(id => id !== orderId)
                : [...prevState, orderId]
        );
    };

    if (loading) {
        return <BoxLoading/>;
    }

    return (
        <div>
            <h1>{t("Account Orders")}</h1>
            {data ? (
                <ul className="flex flex-col justify-center items-center">
                    {data.map((order) => (
                        <li key={order.id}
                            className="flex flex-col m-1 w-2/5 border-2 border-amber-500 p-4 cursor-pointer rounded-lg">
                            <div className="flex flex-row justify-between" onClick={() => toggleOrder(order.id)}>
                                <div className="content-center">
                                    <p className="text-2xl font-bold">{t("Plan")}: {order.title}</p>
                                    <p className="text-lg font-semibold">{t("Date")}: {order.work_hours.date}</p>
                                </div>
                                <div className="content-center flex flex-row items-center">
                                    <div className="content-center flex flex-row items-center">
                                        {order.payment_type === "cash" ? (
                                            t("Cash payment")
                                        ) : (
                                            <div>
                                                {order.is_paid ? t("Payment completed") :
                                                    <button onClick={handlePayment}>{t("Pay your reservations")}</button>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <FontAwesomeIcon size="xs" icon={faArrowDown}/>
                                    </div>
                                </div>
                            </div>

                            {expandedOrderIds.includes(order.id) && (
                                <div className="mt-2 pt-3 border-t-2 border-zinc-600">
                                    <p className="text-lg"><span className="font-semibold text-lg">{t("Trainer")}:" +
                                        " </span>{order.work_hours.trainer.name} {order.work_hours.trainer.last_name}</p>
                                    <p className="text-lg"><span className="font-semibold text-lg">{t("Trainer phone" +
                                        " number")}: </span>{order.work_hours.trainer.phone_number}</p>
                                    <p className="text-lg"><span className="font-semibold text-lg">{t("Start hour")}: </span>{order.work_hours.start_datetime}</p>
                                    <p className="text-lg"><span className="font-semibold text-lg">{t("End hour")}: </span>{order.work_hours.end_datetime}</p>
                                    <p className="text-lg"><span className="font-semibold text-lg">{t("Payment" +
                                        " method")}: </span>{order.payment_type}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default AccountOrders;
