const knex = require('../configs/conexao');

const checarEmailClienteDb = async (email) => {
  return await knex('clientes').where({email}).first();
}

const emailAtualCliente = async (id, email) => {
  return await knex('clientes').select(email).where({id}).first();
}

const checarCPFClienteDb = async(cpf) => {
  return await knex('clientes').where({cpf}).first();
}

const incluirClienteDb = async (nome, email, cpf,telefone,cep,logradouro,complemento,bairro,cidade,estado) => {
  return await knex('clientes').insert({
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado
    });
}

const atualizarClienteDb = async(id,nome,email,cpf,telefone,cep,logradouro,complemento,bairro,cidade,estado) => {
  return await knex('clientes').where({id}).update({
    nome, 
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado
  })
}

const listarClientesDb = async () => {
    return await knex('clientes').orderBy('nome', 'asc');
}

const listarClienteDb = async (id) => {
  return await knex('clientes').where({id: id}).first();
}

const buscarDadosDb = async (nome,email,cpf) => {
  return await knex("clientes").select('*').whereILike("nome", `%${nome}%` ).andWhereILike("email", `%${email}%`).andWhereILike("cpf", `%${cpf}%`);
}

module.exports = {
    incluirClienteDb,
    checarCPFClienteDb,
    checarEmailClienteDb,
    listarClientesDb,
    atualizarClienteDb,
    emailAtualCliente,
    listarClienteDb,
    buscarDadosDb
}
