import React, {useEffect, useState} from 'react';
import {useGetUserReservations} from "./mutations.jsx";
import BoxLoading from "./BoxLoading.jsx";
import {faArrowDown, faWeight} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AccountOrders = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {mutateAsync: mutateGetUserReservations} = useGetUserReservations();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await mutateGetUserReservations();
                setData(data);
                setLoading(false)
            } catch (error) {
                console.error("Error details:", error);
                setLoading(false)
            }
        };

        fetchData();
    }, [mutateGetUserReservations]);
    console.log("data", data)
    if (loading) {
        return <BoxLoading/>;
    }

    return (
        <div>
            <h1>Account Orders</h1>
            {data ? (
                <ul className="flex flex-col justify-center items-center">
                    {data.map((order) => (
                        <li className="flex flex-row m-5 w-2/5 justify-between">
                            <div className="content-center">
                                <p>Plan: {order.title}</p>
                                <p>Data: {order.work_hours.date} {order.work_hours.start_datetime} - {order.work_hours.end_datetime}</p>
                            </div>
                            {/*<p>Trener: {order.work_hours.trainer.name} {order.work_hours.trainer.last_name}</p>*/}
                            {/*<p>Godzina rozpoczęcia: {order.work_hours.start_datetime}</p>*/}
                            {/*<p>Godzina zakończenia: {order.work_hours.end_datetime}</p>*/}
                            {/*<p>Metoda Płatności: {order.payment_type === "cash" ? "Płatność gotówką" : "Przelew" +*/}
                            {/*    " lub karta"}</p>*/}
                            <div className="m-5 content-center flex flex-row">
                                {order.payment_type === "cash" ? (
                                    "Opłacone: Płatność na miejscu"
                                ) : (
                                    <div>
                                        {order.is_paid ? "Płatność opłacona" :
                                            <button>Opłać rezerwacje</button>}
                                    </div>
                                )}
                                <div className="content-center ml-3"><FontAwesomeIcon size="xs" icon={faArrowDown}/></div>
                            </div>

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
