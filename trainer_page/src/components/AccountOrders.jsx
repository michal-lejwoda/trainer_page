import React, { useEffect, useState } from 'react';
import { useGetUserReservations } from "./mutations.jsx";
import BoxLoading from "./BoxLoading.jsx";
import { faArrowDown } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccountOrders = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { mutateAsync: mutateGetUserReservations } = useGetUserReservations();
    const [expandedOrderIds, setExpandedOrderIds] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handlePayment = () => {
        console.log("handlePayment");
        navigate("/login");
    };
    console.log("data", data)
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
        return <BoxLoading />;
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-container-grey p-10 rounded-2xl">
            <div className="mb-5">
                <span className="text-4xl">{t("Account Orders")}</span>
            </div>
            {data && data.length > 0 ? (
                <ul className="w-full flex flex-col items-center ">
                    {data.map((order) => (
                        <li key={order.id}
                            className="m-1 w-full max-w-2xl border-2 border-amber-500 p-4 cursor-pointer rounded-lg mx-auto">
                            <div className="flex flex-row justify-between" onClick={() => toggleOrder(order.id)}>
                                <div>
                                    <p className="text-2xl font-bold">{t("Plan")}: {order.title}</p>
                                    <p className="text-lg font-semibold">{t("Date")}: {order.work_hours.date}</p>
                                </div>
                                <div className="flex flex-row items-center">
                                    {order.payment_type === "cash" ? (
                                        t("Cash payment")
                                    ) : (
                                        <button onClick={handlePayment}>
                                            {order.is_paid ? t("Payment completed") : t("Pay your reservations")}
                                        </button>
                                    )}
                                    <FontAwesomeIcon size="xs" icon={faArrowDown} className="ml-3" />
                                </div>
                            </div>

                            {expandedOrderIds.includes(order.id) && (
                                <div className="mt-2 pt-3 border-t-2 border-zinc-600">
                                    <p className="text-lg font-semibold">{t("Trainer")}: {order.work_hours.trainer.name} {order.work_hours.trainer.last_name}</p>
                                    <p className="text-lg font-semibold">{t("Trainer phone number")}: {order.work_hours.trainer.phone_number}</p>
                                    <p className="text-lg font-semibold">{t("Start hour")}: {order.work_hours.start_datetime}</p>
                                    <p className="text-lg font-semibold">{t("End hour")}: {order.work_hours.end_datetime}</p>
                                    <p className="text-lg font-semibold">{t("Payment method")}: {order.payment_type}</p>
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
