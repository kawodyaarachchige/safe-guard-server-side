export class User{
    email: string;
    name: string;
    password: string;
    incidents: string[];
    contacts: string[];

    constructor(email: string, name: string, password: string, incidents: string[], contacts: string[]){
        this.email = email;
        this.name = name;
        this.password = password;
        this.incidents = incidents;
        this.contacts = contacts;
    }
}