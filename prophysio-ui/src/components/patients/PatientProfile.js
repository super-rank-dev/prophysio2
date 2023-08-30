import { useParams } from "react-router-dom";

const PatientProfile = () => {

    const { patientId } = useParams();

    return (
        <div>{patientId}</div>
    );
}

export default PatientProfile;