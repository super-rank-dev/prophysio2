import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SessionExpired from '../status/SessionExpired';

const ProtectedRoute = () => {

    const { isAuthenticated } = useSelector(({ auth }) => auth);

    return (
        <>
            {isAuthenticated ?
                (<Outlet />) :
                (<SessionExpired />)}
        </>
    );
}

export default ProtectedRoute;