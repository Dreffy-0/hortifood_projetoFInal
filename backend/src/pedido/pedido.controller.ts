import { Controller, Get, Param, Post, Patch, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criarPedido(
    @Body() body: { clienteId: number; produtos: { produtoId: number; quantidade: number }[] },
  ) {
    return this.pedidoService.create(body.clienteId, body.produtos);
  }

  @Get()
  async listarTodos() {
    return this.pedidoService.findAll();
  }

  @Get('cliente/:clienteId')
  async listarPorCliente(@Param('clienteId') clienteId: number) {
    return this.pedidoService.listarPorCliente(Number(clienteId));
  }

  @Patch(':id/status')
  async atualizarStatus(
    @Param('id') id: number,
    @Body() body: { status: string },
  ) {
    return this.pedidoService.atualizarStatus(Number(id), body.status);
  }
}
