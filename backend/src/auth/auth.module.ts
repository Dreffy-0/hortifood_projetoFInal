import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    ClienteModule,
    PassportModule,
    JwtModule.register({
      secret: 'secreta123',  // ✅ Troque por um segredo seguro depois
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
