import { UserRole } from '@prisma/client';

export class SignUpDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  organisationId: string;
  areasOfInterest: string[];
  firebaseId: string;
}
