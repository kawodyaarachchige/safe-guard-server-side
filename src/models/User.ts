export class User{
    email: string;
    name: string;
    password: string;
    incidents: string[];

    constructor(email: string, name: string, password: string, incidents: string[]){
        this.email = email;
        this.name = name;
        this.password = password;
        this.incidents = incidents;
    }
}