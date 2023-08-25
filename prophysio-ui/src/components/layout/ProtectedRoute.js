import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import SessionExpired from '../status/SessionExpired';

const ProtectedRoute = () => {

    const { isAuthenticated } = useSelector(({ auth }) => auth);

    return (
        <>
            {isAuthenticated ?
                (<Outlet />) :
                (<Navigate to="/login" />)}
        </>
    );
}

export default ProtectedRoute;