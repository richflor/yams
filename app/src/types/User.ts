export type User = {
    name:string;
    email:string;
    password:string;
    token:string;
    numberAttempts:number;
    numberPastriesToRetrieve:number;
}

export type InfoUser = Omit<User, "password">

export type SignupInfo = Omit<User, "numberAttempts" | "numberPastriesToRetrieve" | "token">

export type LoginInfo = Omit<SignupInfo, "name">