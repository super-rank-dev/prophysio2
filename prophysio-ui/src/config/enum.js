export const RegistrationFormStatus = {
    PENDING: 'ADD_PATIENT_REQUEST_PENDING',
    ACCEPTED: 'ADD_PATIENT_REQUEST_ACCEPTED'
}

export const AppointmentStatus = {
    BOOKED: 'APPOINTMENT_BOOKED',
    SHOWED_UP: 'APPOINTMENT_SHOWED_UP',
    NO_SHOW: 'APPOINTMENT_NO_SHOW',
    CANCELLED: 'APPOINTMENT_CANCELLED',
    SEEN: 'APPOINTMENT_SEEN'
}

export const AppointmentStatusLink = {
    [AppointmentStatus.BOOKED]: [
        AppointmentStatus.BOOKED,
        AppointmentStatus.SHOWED_UP,
        AppointmentStatus.NO_SHOW,
        AppointmentStatus.CANCELLED
    ],
    [AppointmentStatus.SHOWED_UP]: [
        AppointmentStatus.SHOWED_UP,
        AppointmentStatus.SEEN
    ],
    [AppointmentStatus.NO_SHOW]: [
        AppointmentStatus.NO_SHOW,
        AppointmentStatus.CANCELLED
    ],
    [AppointmentStatus.CANCELLED]: [
        AppointmentStatus.CANCELLED
    ],
    [AppointmentStatus.SEEN]: [
        AppointmentStatus.SEEN
    ]
}

export const AppointmentStatusLabel = {
    [AppointmentStatus.BOOKED]: 'Booked',
    [AppointmentStatus.SHOWED_UP]: 'Showed Up',
    [AppointmentStatus.NO_SHOW]: 'No Show',
    [AppointmentStatus.CANCELLED]: 'Cancelled',
    [AppointmentStatus.SEEN]: 'Seen'
}

export const AppointmentBgColor = {
    [AppointmentStatus.BOOKED]: '#33CCFF',
    [AppointmentStatus.SHOWED_UP]: '#CCEE00',
    [AppointmentStatus.NO_SHOW]: '#C3C3C3',
    [AppointmentStatus.CANCELLED]: '#FF8080',
    [AppointmentStatus.SEEN]: '#009933'
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

export const EmploymentStatus = {
    UNKNOWN: 'Unknown',
    EMPLOYED: 'Employed',
    SELF_EMPLOYED: 'Self-Employed',
    UNEMPLOYED: 'Unemployed',
    RETIRED: 'Retired'
}