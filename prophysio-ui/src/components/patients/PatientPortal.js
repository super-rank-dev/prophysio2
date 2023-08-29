import { Box } from "@mui/material";
import PatientRegistrationForm from "./PatientRegistrationForm";
import PatientIntakeForm from "./PatientIntakeForm";
import { PatientPortalType } from "../../config/enum";

const PatientPortal = ({ type }) => {
    return (
        <Box p={12}>
            {type === PatientPortalType.REGISTRATION ? (
                <PatientRegistrationForm />
            ) : (
                <PatientIntakeForm />
            )}
        </Box>
    );
}

export default PatientPortal