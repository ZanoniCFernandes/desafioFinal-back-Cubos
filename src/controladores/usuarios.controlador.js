const servicosUsuario = require("../serviços/usuarios.serviços");
const servicosLogin = require("../serviços/login.serviços");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  const emailComItemVazio = email.split("").some(item => item === " ");

  if(emailComItemVazio){
    return res.status(400).json("O e-mail não pode conter espaços em branco.");
  }

  const senhaComItemVazio = senha.split("").some(item => item === " ");

  if (senhaComItemVazio) {
    return res.status(400).json("A senha não pode conter espaços em branco.");
  }

  if (senha.length < 5) {
    return res.status(400).json("A senha deve ter, no mínimo, 5 caracteres.");
  }

  try {
    const verificarEmail = await servicosUsuario.checarEmail(email);

    if (verificarEmail) {
      return res.status(400).json("O e-mail informado já existe.");
    }

    const senhaCriptografada = await servicosUsuario.criptografarSenha(senha);

    const inclusaoUsuario = await servicosUsuario.incluirUsuario(
      nome,
      email,
      senhaCriptografada
    );

    if (!inclusaoUsuario) {
      return res.status(400).json("Erro ao cadastrar usuário.");
    }

    return res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;
  const { usuario } = req;

  
  if (!nome || !email) {
    return res.status(400).json("Email e nome são obrigatórios.");
  }

  const emailComItemVazio = email.split("").some(item => item === " ");

  if(emailComItemVazio){
    return res.status(400).json("O e-mail não pode conter espaços em branco.");
  }

  const senhaComItemVazio = senha.split("").some(item => item === " ");

  if (senha && senhaComItemVazio) {
    return res.status(400).json("A senha não pode conter espaços em branco.");
  }

  if(senha){
    if (senha.length < 5) {
      return res.status(400).json("A senha deve ter, no mínimo, 5 caracteres.");
    }
  }

  if(cpf){
    if (cpf.length < 11 || cpf.length > 11) {
      return res.status(400).json("O CPF deve ter 11 caracteres numéricos.");
    }
  }
  
if(telefone){
  if(telefone.length < 10 || telefone.length >= 12){
      return res.status(400).json('O campo telefone deve ter de 10 a 11 dígitos (DDD + Telefone).')
    }

    const telefoneComItemVazio = telefone.split("").some(item => item === " ");

    if(telefoneComItemVazio){
      return res.status(400).json("O telefone não pode conter espaços em branco.");
    }
}

   try {
    if (usuario.email !== email) {
      const verificarEmail = await servicosUsuario.checarEmail(email);
      if (verificarEmail) {
        return res.status(400).json("O e-mail informado já existe.");
      }
    }

    if (usuario.cpf !== cpf) {
      const verificarCpf = await servicosUsuario.checarCpf(cpf);
      if (verificarCpf) {
        return res.status(400).json("CPF já cadastrado.");
      }
    }

    const senhaVazia = Object.keys(senha).length === 0;
    if (!senhaVazia) {
      const senhaCriptografada = await servicosUsuario.criptografarSenha(senha);
      const atualizarDadosUsuario = await servicosUsuario.atualizarUsuario(
          usuario.id,
          nome,
          email,
          senhaCriptografada,
          cpf,
          telefone          
        )
        if (!atualizarDadosUsuario) {
          return res.status(400).json("Não foi possível atualizar esse usuário!");
        }	

    }
    else {
      const atualizarDadosUsuario = await servicosUsuario.atualizarUsuario(
          usuario.id,
          nome,
          email,
          "",
          cpf,
          telefone          
        )
        if (!atualizarDadosUsuario) {
          return res.status(400).json("Não foi possível atualizar esse usuário!");
        }	

    }
    return res.status(200).json("Cadastro alterado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const retornarDadosUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await servicosUsuario.dadosUsuario(id);
    if (!usuario) {
      return res.status(400).json("Usuário não encontrado.");
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  atualizarUsuario,
  retornarDadosUsuario,
};
