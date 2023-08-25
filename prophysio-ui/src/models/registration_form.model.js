import { RegistrationFormStatus } from "../config/enum";

class RegistrationFormModel {
    constructor(data) {
        this.status = RegistrationFormStatus.ACCEPTED;
        for (let pair of data.entries()) {
            const [key, value] = pair;
            this[key] = value;
        }
    }
}

export default RegistrationFormModel;