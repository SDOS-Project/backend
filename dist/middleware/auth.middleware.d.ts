import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseApp } from 'src/firebase/firebase.service';
export declare class PreAuthMiddleware implements NestMiddleware {
    private firebaseApp;
    private auth;
    constructor(firebaseApp: FirebaseApp);
    use(req: Request, res: Response, next: () => void): void;
    private static accessDenied;
}
