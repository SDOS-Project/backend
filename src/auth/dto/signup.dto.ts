import { UserRole } from '@prisma/client';

export class SignUpDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  organisationHandle: string;
  areasOfInterest: string[];
  firebaseId: string;
}
