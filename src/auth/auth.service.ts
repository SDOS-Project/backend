import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
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
      select: {
        firstName: true,
        lastName: true,
        email: true,
        handle: true,
        role: true,
        areasOfInterest: true,
        imgUrl: true,
        organisation: {
          select: {
            name: true,
            handle: true,
            type: true,
            imgUrl: true,
          },
        },
      },
    });
    const organisation = await this.prisma.organisation.findUnique({
      where: {
        firebaseId: sub,
        email: loginDto.email,
      },
      select: {
        name: true,
        email: true,
        type: true,
        imgUrl: true,
        handle: true,
        ipPolicy: true,
      },
    });
    if (!user && !organisation) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return !user ? organisation : user;
  }

  async signup(signUpDto: SignUpDto) {
    const organisation = await this.prisma.organisation.findUnique({
      where: {
        handle: signUpDto.organisationHandle,
      },
      select: {
        type: true,
      },
    });
    if (signUpDto.role === 'FACULTY' && organisation.type !== 'ACADEMIC') {
      throw new HttpException(
        'Faculty can only be associated with academic organisations',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (signUpDto.role === 'EMPLOYEE' && organisation.type !== 'CORPORATE') {
      throw new HttpException(
        'Employee can only be associated with corporate organisations',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const hash = await bcrypt.hash(signUpDto.password, saltRounds);
      return await this.prisma.user.create({
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
          imgUrl: signUpDto.imgUrl,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          handle: true,
          imgUrl: true,
          organisation: {
            select: {
              name: true,
              handle: true,
              type: true,
              imgUrl: true,
            },
          },
        },
      });
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

      return await this.prisma.organisation.create({
        data: {
          name: organisationSignUpDto.name,
          email: organisationSignUpDto.email,
          password: hash,
          type: organisationSignUpDto.type,
          imgUrl: organisationSignUpDto.imgUrl,
          address: organisationSignUpDto.address,
          ipPolicy: organisationSignUpDto.ipPolicy,
          handle: handle,
          firebaseId: organisationSignUpDto.firebaseId,
        },
        select: {
          name: true,
          email: true,
          handle: true,
          type: true,
          imgUrl: true,
          address: true,
          ipPolicy: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
