import React from 'react';
import {Triangle} from "react-loader-spinner";

const BoxLoading = () => {
    return (
        <div className="absolute h-screen w-screen flex items-center justify-center">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default BoxLoading;