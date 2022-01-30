import { Controller, ForbiddenException, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// https://firebase.google.com/docs/auth/web/start?hl=pt-br
@ApiTags('Login')
@Controller({ path: 'login', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sign')
  @ApiOperation({
    summary: 'Cadastra um usuário com a necessidade de um token de acesso',
  })
  async getSign(): Promise<any> {
    const auth = getAuth();
    const accessToken = await signInWithEmailAndPassword(
      auth,
      'enedy_allan@yahoo.com.br',
      '123456',
    )
      .then(async (userCredential) => {
        const user = userCredential.user;

        // refresh token
        // return await auth.currentUser.getIdToken(true);

        return await user.getIdToken();
      })
      .catch((err) => {
        throw new ForbiddenException('Erro token.');
      });

    return accessToken;
  }
}
