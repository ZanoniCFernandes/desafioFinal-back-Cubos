const knex = require('../configs/conexao');

const incluirUsuarioDb = async (nome, email, senhaCriptografada, telefone, cpf) => {
  return await knex('usuarios').insert({
	nome:nome,
  	email:email,
  	senha:senhaCriptografada,
	telefone: telefone,
	cpf: cpf
	});
}

const checarEmailDb = async (email) => {
  return await knex('usuarios').where({email}).first();
}

const checarIdDb = async (id) => {
  return await knex('usuarios').where({id}).first();
}

const dadosUsuarioDb = async (id) => {
  return await knex('usuarios').select('id','nome','email','cpf','telefone').where({id}).first();
}

const checarCPFUsuarioDb = async(cpf) => {
  return await knex('usuarios').where({cpf}).first();
}

const atualizarUsuarioDb = async (id, nome, email, senha, cpf, telefone) => {
  const senhaVazia = Object.keys(senha).length === 0;
  if(senhaVazia){
    return await knex('usuarios')
    .where({ id: id })
    .update({nome: nome, email: email, cpf: cpf, telefone: telefone});
  }
  else{
    return await knex('usuarios')
    .where({ id: id })
    .update({senha: senha, nome: nome, email: email, cpf: cpf, telefone: telefone});
  }
}

module.exports = {
    incluirUsuarioDb,
    checarEmailDb,
    checarCPFUsuarioDb,
    checarIdDb,
    atualizarUsuarioDb,
    dadosUsuarioDb
}
