export class Trainee {
    id: number;
    name: string;
    emailId: string;
    contactNo: number;
    dateOfBirth: Date;
    city: string;
    aboutUs: string;
    password: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.dateOfBirth = new Date();
        this.emailId = '';
        this.contactNo = 0;
        this.aboutUs = '';
        this.password = '';
    }

}
