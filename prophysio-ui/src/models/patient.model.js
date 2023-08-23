class AppointmentModel {
    constructor({
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        emergencyContact
    }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.emergencyContact = emergencyContact;
    }
}

export default AppointmentModel;