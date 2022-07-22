const servicosCliente = require('../serviços/clientes.serviços');
const servicosCobranca = require('../serviços/cobrança.serviços');

const cadastrarCliente = async (req,res) => {
    const {nome, email,cpf,telefone,cep,logradouro,complemento,bairro,cidade,estado} = req.body;

    if(!nome){
        return res.status(400).json('O campo nome é obrigatório.')
    }

    if(!email){
        return res.status(400).json('O campo e-mail é obrigatório.')
    }

    if(!cpf){
        return res.status(400).json('O campo CPF é obrigatório.')
    }

    if(!telefone){
        return res.status(400).json('O campo telefone é obrigatório.')
    }

    if(telefone.length < 10 || telefone.length >= 12){
        console.log(telefone.length);
        return res.status(400).json('O campo telefone deve ter de 10 a 11 dígitos (DDD + Telefone).')
    }

    const telefoneComItemVazio = telefone.split("").some(item => item === " ");

    if(telefoneComItemVazio){
      return res.status(400).json("O telefone não pode conter espaços em branco.");
    }

    const emailComItemVazio = email.split("").some(item => item === " ");

    if(emailComItemVazio){
      return res.status(400).json("O e-mail não pode conter espaços em branco.");
    }
   
    if(cpf.length < 11 || cpf.length > 11){
      return res.status(400).json("O CPF deve ter 11 caracteres numéricos.");
    }

    try {
        const verificarEmail = await servicosCliente.checarEmail(email);

        if(verificarEmail){
            return res.status(400).json('O e-mail informado já existe.')
        }
        
        const verificarCPF = await servicosCliente.checarCpf(cpf);

        if(verificarCPF){
            return res.status(400).json('O CPF informado já existe.')
        }

        const inclusaoUsuario = await servicosCliente.incluirCliente(nome, email,cpf,telefone,cep,logradouro,complemento,bairro,cidade,estado);

        if(!inclusaoUsuario){
            return res.status(400).json('Erro ao cadastrar cliente.')
        }

        return res.status(200).json('Cliente cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const listarClientes = async (req,res) => {
    try {
        let resp = [];
        const clientes = await servicosCliente.listarClientes();
        for(let j = 0; j < clientes.length; j++){
            let cliente = clientes[j];
            let cobrancasDoCliente = await servicosCobranca.listarCobrancasPorCliente(cliente.id);
            let inadimplente = false;
            for(let i = 0; i < cobrancasDoCliente.length; i++){
                if(servicosCobranca.checarVencimento(cobrancasDoCliente[i].vencimento) && cobrancasDoCliente[i].status === 'pendente'){
                    inadimplente = true;
                    break;
                }
            }
            if(inadimplente){
                resp.push({cliente, Status: "Inadimplente"});
            }
            else{
                resp.push({cliente, Status: "Em dia"});
            }
        }
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const listarClientesEmDia = async (req,res) => {
    try {
        let resp = [];
        const clientes = await servicosCliente.listarClientes();
        for(let j = 0; j < clientes.length; j++){
            let cliente = clientes[j];
            let inadimplente = false;
            let cobrancasDoCliente = await servicosCobranca.listarCobrancasPorCliente(cliente.id);
            for(let i = 0; i < cobrancasDoCliente.length; i++){
                if(servicosCobranca.checarVencimento(cobrancasDoCliente[i].vencimento) && cobrancasDoCliente[i].status === 'pendente'){
                    inadimplente = true;
                    break;
                }
            }
            if(!inadimplente){
                resp.push({cliente});
            }
        }
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const listarClientesInadimplentes = async (req,res) => {
    try {
        let resp = [];
        const clientes = await servicosCliente.listarClientes();
        for(let j = 0; j < clientes.length; j++){
            let cliente = clientes[j];
            let cobrancasDoCliente = await servicosCobranca.listarCobrancasPorCliente(cliente.id);
            for(let i = 0; i < cobrancasDoCliente.length; i++){
                if(servicosCobranca.checarVencimento(cobrancasDoCliente[i].vencimento) && cobrancasDoCliente[i].status === 'pendente'){
                    resp.push({cliente});
                    break;
                }
            }
        }
        return res.status(200).json(resp);

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const atualizarCliente = async (req,res) => {
    const {nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado} = req.body;
    const {id} = req.params;

    if(!nome){
        return res.status(400).json('O campo nome é obrigatório.')
    }

    if(!email){
        return res.status(400).json('O campo e-mail é obrigatório.')
    }

    if(!cpf){
        return res.status(400).json('O campo CPF é obrigatório.')
    }

    if(!telefone){
        return res.status(400).json('O campo telefone é obrigatório.')
    }

    if(telefone.length < 10 || telefone.length >= 12){
        console.log(telefone.length);
        return res.status(400).json('O campo telefone deve ter de 10 a 11 dígitos (DDD + Telefone).')
    }
    
    const telefoneComItemVazio = telefone.split("").some(item => item === " ");

    if(telefoneComItemVazio){
      return res.status(400).json("O telefone não pode conter espaços em branco.");
    }

    const emailComItemVazio = email.split("").some(item => item === " ");

    if(emailComItemVazio){
      return res.status(400).json("O e-mail não pode conter espaços em branco.");
    }  

    if(cpf.length < 11 || cpf.length > 11){
      return res.status(400).json("O CPF deve ter 11 caracteres numéricos.");
    }

    try {
        const clienteAtual = await servicosCliente.listarCliente(id);

        const EmailAtualCliente = clienteAtual.email;

        if(EmailAtualCliente !== email){
            const verificarEmail = await servicosCliente.checarEmail(email);

            if(verificarEmail){
                return res.status(400).json('O e-mail informado já existe.')
            }
        }

        const cpfAtualCliente = clienteAtual.cpf;

        if(cpfAtualCliente !== cpf){
            const verificarCPF = await servicosCliente.checarCpf(cpf);

            if(verificarCPF){
                return res.status(400).json('O CPF informado já existe.')
            }
        }             

        const atualizarCliente = await servicosCliente.atualizarCliente(id,nome, email,cpf,telefone,cep,logradouro,complemento,bairro,cidade,estado);

        if(!atualizarCliente){
            return res.status(400).json('Erro ao atualizar cliente.')
        }

        return res.status(200).json('Cliente atualizado com sucesso.');

    } catch(error){
        return res.status(400).json(error.message)
    }
}

const listarCliente = async (req,res) => {
    const { id } = req.params;
    try {
        let cliente = await servicosCliente.listarCliente(id);
        if(!cliente){
            return res.status(400).json("Cliente não existe!")
        }
        let cobrancasDoCliente = await servicosCobranca.listarCobrancasPorCliente(id);
        let inadimplente = false;
        for(let i = 0; i < cobrancasDoCliente.length; i++){
            if(servicosCobranca.checarVencimento(cobrancasDoCliente[i].vencimento)){
                inadimplente = true;
                break;
            }
        }
        if(inadimplente){
            cliente = {cliente, Status: "Inadimplente"};
        }
        else{
            cliente = {cliente, Status: "Em dia"};
        }
        return res.status(200).json(cliente);
      } catch (error) {
        return res.status(400).json(error.message);
      }
}

const buscaListaDeClientes = async (req,res) => {
    const { nome,email,cpf } = req.body;

    try {
        if(!nome && !email && !cpf){
        const clientes = await servicosCliente.listarClientes();
        return res.status(200).json(clientes);
        }
    
        const clientesGeral = await servicosCliente.buscarDados(nome,email,cpf);
        return res.status(200).json(clientesGeral);
    
    
    } catch (error) {
    return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarCliente,
    listarClientes,
    atualizarCliente,
    listarCliente,
    listarClientesEmDia,
    listarClientesInadimplentes,
    buscaListaDeClientes
}
