import { AppointmentBgColor } from "../config/enum";

export const adjustAppointments = ({
    appointments,
    users,
    patients,
    services
}) => (
    appointments.map(appointment => {
        const patient = patients.find(patient => patient._id === appointment.patientId);
        const practitioner = users.find(practitioner => practitioner._id === appointment.practitionerId);
        const service = services.find(service => service._id === appointment.serviceId);
        return {
            ...appointment,
            title: (patient && practitioner && service) ?
                `${patient.firstName} - ${service.name} with ${practitioner.firstName}` :
                'Loading...',
            start: appointment.startTime,
            end: appointment.endTime,
            backgroundColor: AppointmentBgColor[appointment.status],
            borderColor: 'transparent'
        }
    })
)