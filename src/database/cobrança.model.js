const knex = require('../configs/conexao');

const incluirCobrancaDb = async (cliente_id, descricao, status, valor, vencimento) => {
    return await knex('cobrancas').insert({
      cliente_id,
      descricao,
      status,
      valor,
      vencimento
      });
}

const listarCobrancasDb = async () => {
    return await knex('cobrancas').orderBy('cobranca_id', 'asc');
}

const listarCobrancaDb = async (id) => {
    return await knex('cobrancas').where({cobranca_id: id}).first();
}

const listarCobrancasPorIdDb = async (id) => {
    return await knex('cobrancas').where({cobranca_id: id});
}


const listarCobrancasPorClienteDb = async (id) => {
    return await knex('cobrancas').where({cliente_id: id}).orderBy('cobranca_id', 'asc');
}


const atualizarCobrancaDb = async (id, descricao, status, valor, vencimento) => {
    return await knex('cobrancas').where({cobranca_id: id})
    .update({
        descricao,
        status,
        valor,
        vencimento
    });
}

const deletarCobrancaDb = async (id) => {
    return await knex('cobrancas').where({cobranca_id: id}).delete();
}

const somarCobrancasPagasDb = async () => {
    return await knex('cobrancas').where({status: 'pago'}).sum({totalPagas: 'valor'});
}

const somarCobrancasPendentesDb = async () => {
    return await knex('cobrancas').where({status: 'pendente'}).andWhere('vencimento', '>=', new Date(new Date().toISOString().split('T')[0])).sum({totalPendentes: 'valor'});
}

const listarCobrancasPagasDb = async () => {
    return await knex('cobrancas').where({status: "pago"}).orderBy('cobranca_id', 'asc');
}

const listarCobrancasPendentesDb = async () => {
    return await knex('cobrancas').where({status: "pendente"}).andWhere('vencimento', '>=', new Date(new Date().toISOString().split('T')[0])).orderBy('cobranca_id', 'asc');
}

const listarCobrancasVencidasDb = async (data) => {
    return await knex('cobrancas').where('vencimento', '<', data).andWhere('status', '!=', 'pago').orderBy('cobranca_id', 'asc');
}

const somarCobrancasVencidasDb = async (data) => {
    return await knex('cobrancas').where('vencimento', '<', data).andWhere('status', '!=', 'pago').sum({totalVencidas: 'valor'});
}


module.exports = {
    listarCobrancasDb,
    listarCobrancasPorIdDb,
    incluirCobrancaDb,
    listarCobrancasPorClienteDb,
    atualizarCobrancaDb,
    deletarCobrancaDb,
    somarCobrancasPagasDb,
    somarCobrancasPendentesDb,
    listarCobrancasPagasDb,
    listarCobrancasPendentesDb,
    listarCobrancasVencidasDb,
    somarCobrancasVencidasDb,
    listarCobrancaDb
}
