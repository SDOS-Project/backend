import { Discipline, OrganisationType, UserRole } from '@prisma/client';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { OrganisationSignUpDto } from '../dto/organisation.signup.dto';

export const mockUser = {
  id: '1',
  firstName: 'User 1',
  lastName: 'User 1',
  email: 'user1@example.com',
  password: 'password',
  role: UserRole.FACULTY,
  areasOfInterest: ['area1', 'area2'],
  organisationId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  handle: 'user-1',
  firebaseId: 'firebase-id-1',
  imgUrl: 'user1.jpg',
  organisation: {
    id: '1',
    name: 'Org 1',
    type: OrganisationType.ACADEMIC,
    imgUrl: 'org1.jpg',
    handle: 'org-1',
  },
  socialUrl: 'social-url',
  organisationName: 'Org 1',
};

export const sub = 'firebaseId';

export const loginDto: LoginDto = {
  email: '',
  password: '',
};

export const signupDto: SignUpDto = {
  firstName: 'User 1',
  lastName: 'User 1',
  email: 'user@gmail.com',
  password: 'password',
  role: UserRole.FACULTY,
  organisationHandle: 'org-1',
  discipline: Discipline.AerospaceEngineering,
  areasOfInterest: ['area1', 'area2'],
  firebaseId: 'firebase-id-1',
  imgUrl: 'user1.jpg',
  socialUrl: 'social-url',
};

export const organisationSignUpDto: OrganisationSignUpDto = {
  name: 'Org 1',
  email: '',
  password: '',
  type: OrganisationType.ACADEMIC,
  imgUrl: 'org1.jpg',
  address: 'Address 1',
  ipPolicy: 'ip policy',
  firebaseId: 'firebase-id-1',
};
