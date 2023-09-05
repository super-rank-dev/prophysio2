import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SnackbarManager = () => {

    const { isEmpty, content, options } = useSelector(({ snackbar }) => (snackbar));

    useEffect(() => {
        if (!isEmpty) {
            enqueueSnackbar(content, options);
        }
    }, [isEmpty, content, options]);
    
    return (<></>);
}

export default SnackbarManager;