import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { FirebaseApp } from 'src/firebase/firebase-service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor(private firebaseApp: FirebaseApp) {
    this.auth = this.firebaseApp.getAuth();
  }

  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            ...decodedToken,
          };
          console.log('decodedToken', decodedToken);
          next();
        })
        .catch(() => {
          PreAuthMiddleware.accessDenied();
        });
    } else {
      PreAuthMiddleware.accessDenied();
    }
  }

  private static accessDenied() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Access Denied',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
