import React from "react";
import { useSelector } from "react-redux";
import Loading from '../global/Loading';

const NavigationManager = ({ children }) => {

    const { isLoading } = useSelector(({ loading }) => (loading));
    const displayStyle = isLoading ? { display: 'none' } : {};

    return (
        <>
            {isLoading && (<Loading />)}
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { style: displayStyle })
            )}
        </>
    );
}

export default NavigationManager;