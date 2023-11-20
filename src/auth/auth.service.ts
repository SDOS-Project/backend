import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import generateRandomAlphanumericWithLength from './utils';
import * as bcrypt from 'bcrypt';
import { StudentSignupDto } from './dto/student.signup.dto';
import { UserRole } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const saltRounds = 12;
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}
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
        socialUrl: true,
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
    if (signUpDto.role === UserRole.STUDENT) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    if (signUpDto.organisationHandle) {
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
    }
    try {
      const hash = await bcrypt.hash(signUpDto.password, saltRounds);
      const organisationName = await this.findOrganisation(
        signUpDto.email.split('@')[1],
      );
      let userData: any = {
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        email: signUpDto.email,
        password: hash,
        role: signUpDto.role,
        socialUrl: signUpDto.socialUrl,
        discipline: signUpDto.discipline,
        areasOfInterest: signUpDto.areasOfInterest,
        handle:
          signUpDto.firstName.toLowerCase() +
          '-' +
          signUpDto.lastName.toLowerCase() +
          '-' +
          generateRandomAlphanumericWithLength(5),
        firebaseId: signUpDto.firebaseId,
        imgUrl: signUpDto.imgUrl,
        organisationName: organisationName,
      };
      if (signUpDto.organisationHandle) {
        userData = {
          ...userData,
          organisation: {
            connect: {
              handle: signUpDto.organisationHandle,
            },
          },
        };
      }
      return await this.prisma.user.create({
        data: userData,
        select: {
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          handle: true,
          imgUrl: true,
          socialUrl: true,
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
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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
      if (error.code === 'P2002') {
        throw new HttpException(
          'Organisation already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async studentSignup(studentSignupDto: StudentSignupDto) {
    try {
      console.log(studentSignupDto);
      const hash = await bcrypt.hash(studentSignupDto.password, saltRounds);
      const organisationName = await this.findOrganisation(
        studentSignupDto.email.split('@')[1],
      );
      let userData: any = {
        firstName: studentSignupDto.firstName,
        lastName: studentSignupDto.lastName,
        email: studentSignupDto.email,
        password: hash,
        role: UserRole.STUDENT,
        imgUrl: studentSignupDto.imgUrl,
        firebaseId: studentSignupDto.firebaseId,
        organisationName: organisationName,
        handle:
          studentSignupDto.firstName.toLowerCase() +
          '-' +
          studentSignupDto.lastName.toLowerCase() +
          '-' +
          generateRandomAlphanumericWithLength(5),
      };
      if (studentSignupDto.organisationHandle) {
        userData = {
          ...userData,
          organisation: {
            connect: {
              handle: studentSignupDto.organisationHandle,
            },
          },
        };
      }
      console.log(userData);
      return await this.prisma.user.create({
        data: userData,
        select: {
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          handle: true,
          imgUrl: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOrganisation(domain: string): Promise<string> {
    const url = `https://company.clearbit.com/v2/companies/find?domain=${domain}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}` },
        }),
      );
      if (response.status === 200 && response.data) {
        return response.data.name;
      } else {
        throw new HttpException(
          'Unable to retrieve organization name.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        error.response.data.message || 'Error occurred while fetching data.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
