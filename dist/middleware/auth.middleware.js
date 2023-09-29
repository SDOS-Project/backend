"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PreAuthMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase-service");
let PreAuthMiddleware = exports.PreAuthMiddleware = PreAuthMiddleware_1 = class PreAuthMiddleware {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.auth = this.firebaseApp.getAuth();
    }
    use(req, res, next) {
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
                PreAuthMiddleware_1.accessDenied(req.url, res);
            });
        }
        else {
            PreAuthMiddleware_1.accessDenied(req.url, res);
        }
    }
    static accessDenied(url, res) {
        res.status(common_1.HttpStatus.FORBIDDEN).json({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied',
        });
    }
};
exports.PreAuthMiddleware = PreAuthMiddleware = PreAuthMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseApp])
], PreAuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map