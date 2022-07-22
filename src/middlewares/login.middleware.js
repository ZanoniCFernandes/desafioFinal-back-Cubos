const servicosUsuario = require('../serviços/usuarios.serviços');
const senhaHash = require('../utils/senhaHash');
const servicosLogin = require('../serviços/login.serviços');
const jwt = require('jsonwebtoken');


const realizarLogin = async(req,res) => {
    const {email,senha} = req.body;

    if(!email || !senha) {
        return res.status(404).json('Todos os campos são obrigatórios.')
    }

    try {
        const usuario = await servicosUsuario.checarEmail(email);

        if(!usuario){
            return res.status(404).json('E-mail não encontrado. Verifique e tente novamente.')
        }

        const senhaCorreta = await servicosLogin.checarSenha(senha, usuario.senha);

        if(!senhaCorreta){
            return res.status(404).json('E-mail e/ou senha incorretos.')
        }

        const dadosTokenUsuario = {
            id: usuario.id,
            email: usuario.email
        };

        const token = await servicosLogin.gerarToken(dadosTokenUsuario, senhaHash, '6h');

        const {senha: _, ...dadosUsuario} = usuario;

        
        return res.status(200).json({
            usuario:dadosUsuario,
            token
        })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization){
        return res.status(404).json('Token não informado!');
    }

    try{
        const token = authorization.replace('Bearer', '').trim();
        const { id } = await jwt.verify(token, senhaHash);
        const usuarioExiste = await servicosUsuario.checarId(id);
        if(!usuarioExiste){
            return res.status(404).json('Usuário não existe!');
        }
        const {senha: senhaUsuario, ... usuario} = usuarioExiste;
        req.usuario = usuario;
        next();
    }catch(error){
        return res.status(400).json(error.message);
    }
}

module.exports = {
    realizarLogin,
    verificarLogin
}
