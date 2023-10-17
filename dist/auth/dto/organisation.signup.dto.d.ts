import { OrganisationType } from '@prisma/client';
export declare class OrganisationSignUpDto {
    name: string;
    email: string;
    password: string;
    type: OrganisationType;
    imgUrl: string;
    address: string;
    ipPolicy: string;
    firebaseId: string;
}
