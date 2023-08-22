class AppointmentModel {
    constructor({
        _id,
        branchId,
        serviceId,
        practitionerId,
        roomId,
        chargedAmount,
        paidAmount,
        startTime,
        endTime,
        patientId,
        status
    }) {
        this.id = _id;
        this.branchId = branchId;
        this.serviceId = serviceId;
        this.practitionerId = practitionerId;
        this.roomId = roomId;
        this.chargedAmount = chargedAmount;
        this.paidAmount = paidAmount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.patientId = patientId;
        this.status = status;
    }
}

export default AppointmentModel;