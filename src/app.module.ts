import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { FirebaseApp } from './firebase/firebase-service';
import { PreAuthMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FirebaseApp],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PreAuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/signup', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
