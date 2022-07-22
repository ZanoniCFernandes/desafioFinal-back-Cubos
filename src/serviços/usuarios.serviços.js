/* 
  *Os serviços dos usuarios ficarão aqui, por exemplo: 
  * Chamadas para nosso banco de dados devem ser CHAMADAS daqui, não definidas aqui, 
  * eventuais chamadas para endpoints externos também, coisas como "lógica de negócio"
  * também ficam aqui
*/
const usuariosModel = require('../database/usuarios.model');
const bcrypt = require('bcrypt');

const incluirUsuario = async (nome, email, senhaCriptografada) => {
  try {
    return await usuariosModel.incluirUsuarioDb(nome, email, senhaCriptografada)
  } catch(e) {
    throw new Error(e.message)
  }
}

const checarCpf = async (cpf) => {
  try {
    return await usuariosModel.checarCPFUsuarioDb(cpf)
  } catch(e) {
    throw new Error(e.message)
  }
}

const checarEmail = async (email) => {
  try {
    return await usuariosModel.checarEmailDb(email)
  } catch(e) {
    throw new Error(e.message)
  }
}

const checarId = async (id) => {
  try {
    return await usuariosModel.checarIdDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

const dadosUsuario = async (id) =>{
  try {
    return await usuariosModel.dadosUsuarioDb(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

const criptografarSenha = async (senha) =>{
 return await bcrypt.hash(senha,10);
}

const atualizarUsuario = async (id, nome, email,senha, cpf, telefone) =>{
  return await usuariosModel.atualizarUsuarioDb(id, nome, email,senha, cpf, telefone);
}

module.exports = {
    criptografarSenha,
    incluirUsuario,
    checarEmail,
    checarCpf,
    checarId,
    atualizarUsuario,
    dadosUsuario
}
