const cobrancasModel = require('../database/cobrança.model');

const incluirCobranca = async (cliente_id, descricao, status, valor, vencimento)  => {
    try {
      return await cobrancasModel.incluirCobrancaDb(cliente_id, descricao, status, valor, vencimento);
    } catch(e) {
      throw new Error(e.message);
    }
}

const listarCobrancas = async() => {
  try {
    return await cobrancasModel.listarCobrancasDb();
  } catch(e) {
    throw new Error(e.message);
  }
}


const listarCobranca = async(id) => {
  try {
    return await cobrancasModel.listarCobrancaDb(id);
  } catch(e) {
    throw new Error(e.message);
  }

}
const listarCobrancaPorId = async(id) => {
  try {
    return await cobrancasModel.listarCobrancasPorIdDb(id);
  } catch (e) {
    throw new Error(e.message)

  }
}

const listarCobrancasPorCliente = async(id) => {
    try {
      return await cobrancasModel.listarCobrancasPorClienteDb(id);
    } catch(e) {
      throw new Error(e.message);
    }
}

function checarVencimento(data) {
  const dataVencimento = new Date(data);
  const dataAtual = new Date(new Date().toISOString().split('T')[0]);
  return dataAtual > dataVencimento;
}

const atualizarCobranca = async (id, descricao, status, valor, vencimento) => {
    try {
        return await cobrancasModel.atualizarCobrancaDb(id, descricao, status, valor, vencimento);
      } catch(e) {
        throw new Error(e.message);
      }
}

const deletarCobranca = async (id) => {
  try {
      return await cobrancasModel.deletarCobrancaDb(id);
    } catch(e) {
      throw new Error(e.message);
    }
}

const listarCobrancasComValores = async () => {
  try {
    const cobrancas = await listarCobrancas();
    const valorPago = await cobrancasModel.somarCobrancasPagasDb();
    const valorPendente = await cobrancasModel.somarCobrancasPendentesDb();
    let cobrancasComValores = [];
    cobrancasComValores.push({totalPendente: valorPendente, totalPago: valorPago, totalCobranca: cobrancas});
    return cobrancasComValores;
  } catch(e) {
    throw new Error(e.message);
  }
}

const valorCobrancasPagas = async () =>{
  try {
    return await cobrancasModel.somarCobrancasPagasDb();
  } catch(e) {
    throw new Error(e.message);
  }
}

const valorCobrancasPrevistas = async () =>{
  try {
    return await cobrancasModel.somarCobrancasPendentesDb();
  } catch(e) {
    throw new Error(e.message);
  }
}

const valorCobrancasVencidas = async (data) =>{
  try {
    return await cobrancasModel.somarCobrancasVencidasDb(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const listarCobrancasPendentes = async () =>{
  try {
    return await cobrancasModel.listarCobrancasPendentesDb();
  } catch(e) {
    throw new Error(e.message);
  }
}

const listarCobrancasPagas = async () =>{
  try {
    return await cobrancasModel.listarCobrancasPagasDb();
  } catch(e) {
    throw new Error(e.message);
  }
}

const listarCobrancasVencidas = async (data) => {
  try {
    return await cobrancasModel.listarCobrancasVencidasDb(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

module.exports = {
    incluirCobranca,
    listarCobrancas,
    listarCobrancaPorId,
    listarCobrancasPorCliente,
    atualizarCobranca,
    checarVencimento,
    deletarCobranca,
    listarCobrancasComValores,
    valorCobrancasPagas,
    valorCobrancasPrevistas,
    listarCobrancasPendentes,
    listarCobrancasPagas,
    listarCobrancasVencidas,
    valorCobrancasVencidas,
    listarCobranca
}
