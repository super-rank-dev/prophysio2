export const RegistrationFormStatus = {
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

export const IntakeFormStatus = {
    UNKNOWN: 'INTAKE_FORM_UNKNOWN',
    PENDING: 'INTAKE_FORM_PENDING',
    ACCEPTED: 'INTAKE_FORM_ACCEPTED'
}

export const BodyPart = [
    'Shoulder',
    'Elbow',
    'Wrist',
    'Fingers/Hand'
]

export const Questionnaire = [
    'Dash Questionnaire',
    'Quick Dash',
    'Patient Specfic Functional Scale'
]

export const Objective = [
    'Palpation',
    'Girth measurements',
    'AROM',
    'PROM',
    'END FEEL',
    'Joint Play',
    'MMT',
    'RIM',
    'Special Test'
]

export const SpecialTest = [
    'Empty Can',
    'Apprehension Test',
    'Painful arc',
    'ULTT',
    'Hawkins/Kenedy',
    'Speeds Test',
    'Varus/Valgus',
    'Maudley',
    'Mills',
    'ULTT'
]

export const PatientPortalType = {
    REGISTRATION: 'Patient Registration Form',
    INTAKE: 'Patient Intake Form'
}