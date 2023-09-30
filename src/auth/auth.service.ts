import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import generateRandomAlphanumericWithLength from './utils';
import * as bcrypt from 'bcrypt';

const saltRounds = 12;
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(sub: string, loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseId: sub,
        email: loginDto.email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async signup(signUpDto: SignUpDto) {
    try {
      const hash = await bcrypt.hash(signUpDto.password, saltRounds);
      const user = await this.prisma.user.create({
        data: {
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          email: signUpDto.email,
          password: hash,
          role: signUpDto.role,
          organisation: {
            connect: {
              handle: signUpDto.organisationHandle,
            },
          },
          areasOfInterest: signUpDto.areasOfInterest,
          handle:
            signUpDto.firstName.toLowerCase() +
            '-' +
            signUpDto.lastName.toLowerCase() +
            '-' +
            generateRandomAlphanumericWithLength(5),
          firebaseId: signUpDto.firebaseId,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'A user with similar credentials already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new Error(error);
    }
  }

  async organisationSignup(organisationSignUpDto: OrganisationSignUpDto) {
    try {
      const hash = await bcrypt.hash(
        organisationSignUpDto.password,
        saltRounds,
      );

      const handle =
        organisationSignUpDto.name.split(' ').join('-').toLowerCase() +
        '-' +
        generateRandomAlphanumericWithLength(5);

      const organisation = await this.prisma.organisation.create({
        data: {
          name: organisationSignUpDto.name,
          email: organisationSignUpDto.email,
          password: hash,
          type: organisationSignUpDto.type,
          logoUrl: organisationSignUpDto.logoUrl,
          address: organisationSignUpDto.address,
          ipPolicy: organisationSignUpDto.ipPolicy,
          handle: handle,
          firebaseId: organisationSignUpDto.firebaseId,
        },
      });
      return organisation;
    } catch (error) {
      throw new Error(error);
    }
  }
}
