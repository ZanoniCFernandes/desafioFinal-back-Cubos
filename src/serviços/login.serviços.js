const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checarSenha = async (senhaInserida, senhaArmazenada) => {
    return await bcrypt.compare(senhaInserida, senhaArmazenada);
   }

const gerarToken = async (dadosTokenUsuario, senhaHash, tempoDeValidade) => {
    return await jwt.sign(dadosTokenUsuario, senhaHash,{expiresIn: tempoDeValidade});
}

module.exports = {
    checarSenha,
    gerarToken
}
