const servicosCobrancas = require("../serviços/cobrança.serviços");
const servicosCliente = require('../serviços/clientes.serviços');

const cadastrarCobranca = async (req, res) => {
  const { id, descricao, status, valor, vencimento } = req.body;
  
  if (!descricao) {
    return res.status(400).json("descricao obrigatória.");
  }
  
  if (!id) {
    return res.status(400).json("id obrigatório.");
  }

  if (!status) {
    return res.status(400).json("status obrigatório.");
  }
  
  if (!valor) {
    return res.status(400).json("valor obrigatório.");
  }
  
  if (!vencimento) {
    return res.status(400).json("vencimento obrigatório.");
  }
  
  if(status != 'pago' && status != 'pendente'){
    return res.status(400).json("Status inválido.");
  }
  
  if(valor <= 0){
    return res.status(400).json('Cobrança necessita de valor maior que zero.');
  } 

  try {

    const inclusaoCobranca = await servicosCobrancas.incluirCobranca(
        id, 
        descricao, 
        status, 
        valor, 
        vencimento
    );

    if (!inclusaoCobranca) {
      return res.status(400).json("Erro ao cadastrar cobrança.");
    }

    return res.status(200).json("Cobrança cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const retornarTodasCobrancas = async (req, res) => {
    try {
        const todasCobrancas = await servicosCobrancas.listarCobrancas();
        let resp = [];
        for(let i = 0; i < todasCobrancas.length; i++){
          const cobranca = todasCobrancas[i];
          const cliente = await servicosCliente.listarCliente(cobranca.cliente_id);
          resp.push({cliente: cliente.nome, cobranca_id: cobranca.cobranca_id, 
                    valor: cobranca.valor, vencimento: cobranca.vencimento, 
                    status: cobranca.status, descricao: cobranca.descricao});
        }
        return res.status(200).json(resp);
      } catch (error) {
        return res.status(400).json(error.message);
      }
};

const retornarCobrancasCliente = async (req, res) => {
    const { id } = req.params;
    try {
        let cobrancasDoCliente = await servicosCobrancas.listarCobrancasPorCliente(id);
        return res.status(200).json(cobrancasDoCliente);
      } catch (error) {
        return res.status(400).json(error.message);
      }
};

const atualizarCobranca = async (req, res) => {
    const { id } = req.params;
    const {descricao, status, valor, vencimento} = req.body;
    try {
      if(valor <= 0){
        return res.status(400).json('Cobrança necessita de valor maior que zero.');
      } 
      if(await servicosCobrancas.atualizarCobranca(id, descricao, status, valor, vencimento))
        return res.status(200).json('Cobrança atualizada com sucesso.');
      } catch (error) {
        return res.status(400).json(error.message);
      }
}

const deletarCobranca = async (req, res) => {
  const { id } = req.params;
  try {
    const cobranca = await servicosCobrancas.listarCobranca(id);
    if(cobranca.status == 'pendente' && !servicosCobrancas.checarVencimento(cobranca.vencimento))
    {
      if(await servicosCobrancas.deletarCobranca(id));
        return res.status(200).json('Cobrança deletada com sucesso.');
    }
    return res.status(400).json('Cobrança não deletada.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const retornarCobrancasComValores = async (req, res) => {
  try {
      let cobrancasDoClienteComValores = await servicosCobrancas.listarCobrancasComValores();
      return res.status(200).json(cobrancasDoClienteComValores);
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

const retornarValorCobrancasPagas = async (req, res) => {
  try {
      let cobrancasDoClienteComValores = await servicosCobrancas.valorCobrancasPagas();
      return res.status(200).json(cobrancasDoClienteComValores);
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

const retornarValorCobrancasPrevistas = async (req, res) => {
  try {
      let cobrancasDoClienteComValores = await servicosCobrancas.valorCobrancasPrevistas();
      return res.status(200).json(cobrancasDoClienteComValores);
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

const retornarValorCobrancasVencidas = async (req, res) => {
  try {
      let cobrancasDoClienteComValores = await servicosCobrancas.valorCobrancasVencidas(new Date());
      return res.status(200).json(cobrancasDoClienteComValores);
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

const retornarCobranca = async(req,res) => {
  const {id} = req.params;

  try {
    const cobranca = await servicosCobrancas.listarCobrancaPorId(id);
    return res.status(200).json(cobranca);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const listarCobrancasVencidas = async (req,res) => {
  try {
    let cobrancasVencidas = await servicosCobrancas.listarCobrancasVencidas(new Date());
    let resp = [];
    for(let i = 0; i < cobrancasVencidas.length; i++){
      const cobranca = cobrancasVencidas[i];
      const cliente = await servicosCliente.listarCliente(cobranca.cliente_id);
      resp.push({cliente: cliente.nome, cobranca_id: cobranca.cobranca_id, 
                valor: cobranca.valor, vencimento: cobranca.vencimento, 
                status: cobranca.status, descricao: cobranca.descricao});
    }
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const listarCobrancasPagas = async (req,res) => {
  try {
    let cobrancasPagas = await servicosCobrancas.listarCobrancasPagas();
    let resp = [];
    for(let i = 0; i < cobrancasPagas.length; i++){
      const cobranca = cobrancasPagas[i];
      const cliente = await servicosCliente.listarCliente(cobranca.cliente_id);
      resp.push({cliente: cliente.nome, cobranca_id: cobranca.cobranca_id, 
                valor: cobranca.valor, vencimento: cobranca.vencimento, 
                status: cobranca.status, descricao: cobranca.descricao});
    }
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const listarCobrancasPendentes = async (req,res) => {
  try {
    let cobrancasPendentes = await servicosCobrancas.listarCobrancasPendentes();
    let resp = [];
    for(let i = 0; i < cobrancasPendentes.length; i++){
      const cobranca = cobrancasPendentes[i];
      const cliente = await servicosCliente.listarCliente(cobranca.cliente_id);
      resp.push({cliente: cliente.nome, cobranca_id: cobranca.cobranca_id, 
                valor: cobranca.valor, vencimento: cobranca.vencimento, 
                status: cobranca.status, descricao: cobranca.descricao});
    }
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
    cadastrarCobranca,
    retornarCobranca,
    retornarTodasCobrancas,
    retornarCobrancasCliente,
    atualizarCobranca,
    deletarCobranca,
    retornarCobrancasComValores,
    retornarValorCobrancasPagas,
    retornarValorCobrancasPrevistas,
    retornarValorCobrancasVencidas,
    listarCobrancasVencidas,
    listarCobrancasPagas,
    listarCobrancasPendentes
  };
