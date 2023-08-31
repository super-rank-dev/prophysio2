class AppointmentModel {
    constructor({
        _id,
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        phoneNumber,
        address,
        emergencyContact
    }) {
        this.id = _id;
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