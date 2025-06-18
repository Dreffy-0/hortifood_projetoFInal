import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClienteService } from '../cliente/cliente.service';

@Injectable()
export class AuthService {
  constructor(
    private clienteService: ClienteService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const cliente = await this.clienteService.buscarPorEmail(email);
    if (!cliente) throw new UnauthorizedException('E-mail inválido.');
    const senhaConfere = await bcrypt.compare(senha, cliente.senha);
    if (!senhaConfere) throw new UnauthorizedException('Senha inválida.');

    const payload = { sub: cliente.id, email: cliente.email, nome: cliente.nome };
    return {
      access_token: this.jwtService.sign(payload),
      cliente: {
        id: cliente.id,
        email: cliente.email,
        nome: cliente.nome,
        tipo: cliente.tipo,
      },
    };
  }
}
