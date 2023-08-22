export const ApplicationStatus = {
    PENDING: 'ADD_PATIENT_REQUEST_PENDING',
    ACCEPTED: 'ADD_PATIENT_REQUEST_ACCEPTED'
}

export const AppointmentStatus = {
    BOOKED: 'APPOINTMENT_BOOKED',
    SHOWED_UP: 'APPOINTMENT_SHOWED_UP',
    NO_SHOW: 'APPOINTMENT_NO_SHOW',
    CANCELLED: 'APPOINTMENT_CANCELLED'
}

export const AppointmentBgColor = {
    [AppointmentStatus.BOOKED]: '#3399CC',
    [AppointmentStatus.SHOWED_UP]: '#009933',
    [AppointmentStatus.NO_SHOW]: '#C3C3C3',
    [AppointmentStatus.CANCELLED]: '#FF8080',
}

export const PatientApplicationViewMode = {
    DOCTOR: 'PATIENT_APPLICATION_DOCTOR_VIEW',
    PATIENT: 'PATIENT_APPLICATION_PATIENT_VIEW'
}

export const IdType = {
    ID_CARD: 'ID_CARD',
    PASSPORT: 'PASSPORT',
    DRIVER_LICENSE: 'DRIVER_LICENSE'
}

export const CalendarViewMode = {
    MONTH: 'dayGridMonth',
    WEEK: 'timeGridWeek',
    DAY: 'timeGridDay'
}