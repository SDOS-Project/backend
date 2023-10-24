import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { OrganisationSignUpDto } from '../dto/organisation.signup.dto';
export declare const mockUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "FACULTY";
    areasOfInterest: string[];
    organisationId: string;
    createdAt: Date;
    updatedAt: Date;
    handle: string;
    firebaseId: string;
    imgUrl: string;
    organisation: {
        id: string;
        name: string;
        type: "ACADEMIC";
        imgUrl: string;
        handle: string;
    };
};
export declare const sub = "firebaseId";
export declare const loginDto: LoginDto;
export declare const signupDto: SignUpDto;
export declare const organisationSignUpDto: OrganisationSignUpDto;
