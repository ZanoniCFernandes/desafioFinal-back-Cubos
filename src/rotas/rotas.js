const express = require('express');
const usuarios = require('../controladores/usuarios.controlador');
const login = require('../middlewares/login.middleware');
const clientes = require('../controladores/clientes.controlador');
const cobrancas = require('../controladores/cobrança.controlador');
const rotas = express();

rotas.post('/cadastrar', usuarios.cadastrarUsuario);
rotas.post('/entrar', login.realizarLogin);

rotas.use(login.verificarLogin);

rotas.get('/listar-clientes', clientes.listarClientes);
rotas.get('/listar-clientes-em-dia', clientes.listarClientesEmDia);
rotas.get('/listar-clientes-inadimplente', clientes.listarClientesInadimplentes);
rotas.post('/cadastrar-cliente', clientes.cadastrarCliente);
rotas.put('/atualizar-cliente/:id', clientes.atualizarCliente);
rotas.get('/listar-cliente/:id', clientes.listarCliente);

rotas.put('/atualizar-usuario', usuarios.atualizarUsuario);
rotas.get('/dados-usuario/:id', usuarios.retornarDadosUsuario);

rotas.post('/cadastrar-cobranca', cobrancas.cadastrarCobranca);
rotas.put('/atualizar-cobranca/:id', cobrancas.atualizarCobranca);
rotas.get('/listar-cobrancas-pagas', cobrancas.listarCobrancasPagas);
rotas.get('/listar-cobrancas-pendentes', cobrancas.listarCobrancasPendentes);
rotas.get('/listar-cobrancas-vencidas', cobrancas.listarCobrancasVencidas);
rotas.get('/valor-cobrancas-pagas', cobrancas.retornarValorCobrancasPagas);
rotas.get('/valor-cobrancas-previstas', cobrancas.retornarValorCobrancasPrevistas);
rotas.get('/valor-cobrancas-vencidas', cobrancas.retornarValorCobrancasVencidas);
rotas.get('/listar-cobrancas', cobrancas.retornarTodasCobrancas);
rotas.get('/listar-cobrancas/:id', cobrancas.retornarCobrancasCliente);
rotas.get('/listar-cobrancas-valores', cobrancas.retornarCobrancasComValores);
rotas.get('/listar-cobranca/:id',cobrancas.retornarCobranca);

rotas.delete('/deletar-cobranca/:id', cobrancas.deletarCobranca);

rotas.get('/buscar-dados-clientes',clientes.buscaListaDeClientes);

module.exports = rotas;
