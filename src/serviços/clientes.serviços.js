const clientesModel = require('../database/clientes.model');

const checarEmail = async (email) => {
  try {
    return await clientesModel.checarEmailClienteDb(email)
  } catch(e) {
    throw new Error(e.message)
  }
}

const incluirCliente = async (nome, email, cpf,tel,cep,logradouro,complemento,bairro,cidade,estado)  => {
    try {
      return await clientesModel.incluirClienteDb(nome, email, cpf,tel,cep,logradouro,complemento,bairro,cidade,estado)
    } catch(e) {
      throw new Error(e.message)
    }
}

const atualizarCliente = async(id,nome,email,cpf,tel,cep,logradouro,complemento,bairro,cidade,estado) => {
    return await clientesModel.atualizarClienteDb(id,nome,email,cpf,tel,cep,logradouro,complemento,bairro,cidade,estado);
}

const buscarDados = async(id,nome,email,cpf) => {
  try {
    return await clientesModel.buscarDadosDb(id,nome,email,cpf);
  } catch(e) {
    throw new Error(e.message)
  }
}

const checarCpf = async (cpf)  => {
    try {
      return await clientesModel.checarCPFClienteDb(cpf)
    } catch(e) {
      throw new Error(e.message)
    }
}


const listarClientes = async() => {
  try {
    return await clientesModel.listarClientesDb();
  } catch(e) {
    throw new Error(e.message)
  }
}

const listarCliente = async(id) => {
  try {
    return await clientesModel.listarClienteDb(id);
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
    checarEmail,
    incluirCliente,
    checarCpf,
    listarClientes,
    atualizarCliente,
    listarCliente,
    buscarDados
}