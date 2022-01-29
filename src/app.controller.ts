import { Controller, ForbiddenException, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// https://firebase.google.com/docs/auth/web/start?hl=pt-br
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getSign(): Promise<any> {
    const auth = getAuth();
    const accessToken = await signInWithEmailAndPassword(
      auth,
      'enedy_allan@yahoo.com.br',
      '123456',
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        return await user.getIdToken();
      })
      .catch((err) => {
        throw new ForbiddenException('Erro token.');
      });

    return accessToken;
  }
}
