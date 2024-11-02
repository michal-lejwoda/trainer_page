import React, { useEffect, useState } from 'react';
import { useGetUserReservations } from "./mutations.jsx";
import BoxLoading from "./BoxLoading.jsx";

const AccountOrders = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { mutateAsync: mutateGetUserReservations } = useGetUserReservations();

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
    console.log("adsda",data)
    if (loading) {
        return <BoxLoading />;
    }

    return (
        <div>
            <h1>Account Orders</h1>
            {data ? (
                <ul>
                    {data.map((order) => (
                        <h1>test</h1>
                        // <li key={order.id}>{order.details}</li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default AccountOrders;
