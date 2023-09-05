import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const delay = {
    '/': 2000,
    '/patients': 500,
    '/guarantors': 500,
    '/appointments': 500,
    '/billing': 500,
    '/invoices': 500,
    '/statement': 500,
    '/settings': 2000,
    '/users': 500
};

const NavigationManager = ({ setIsLoading }) => {

    const path = useLocation();
    const [sign, setSign] = useState({});

    useEffect(() => {
        // if (!sign[path.pathname]) {
        //     setIsLoading(true);
        //     setTimeout(() => setIsLoading(false), delay[path.pathname]);
        //     setSign({
        //         ...sign,
        //         [path.pathname]: true
        //     });
        // }
    }, [path]);

    return (<></>);
}

export default NavigationManager;