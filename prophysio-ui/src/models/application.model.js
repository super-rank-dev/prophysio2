class AppointmentModel {
    constructor(data) {
        for (let pair of data.entries()) {
            const [key, value] = pair;
            this[key] = value;
        }
    }
}

export default AppointmentModel;