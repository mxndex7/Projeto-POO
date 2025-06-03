
/**
 * Classe Paciente - Representa um paciente da clínica
 */
class Paciente {
    /**
     * Construtor da classe Paciente
     * @param {string} nome - Nome completo do paciente
     * @param {string} cpf - CPF do paciente
     * @param {string} email - E-mail do paciente
     * @param {string} telefone - Telefone do paciente
     * @param {string} dataNascimento - Data de nascimento
     */
    constructor(nome, cpf, email, telefone, dataNascimento) {
        this.id = this.gerarId();
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date().toISOString();
    }

    /**
     * Gera um ID único para o paciente
     * @returns {string} ID único
     */
    gerarId() {
        return 'pac_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Calcula a idade do paciente
     * @returns {number} Idade em anos
     */
    calcularIdade() {
        const hoje = new Date();
        const nascimento = new Date(this.dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade;
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} Objeto JSON
     */
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            cpf: this.cpf,
            email: this.email,
            telefone: this.telefone,
            dataNascimento: this.dataNascimento,
            dataCadastro: this.dataCadastro
        };
    }

    /**
     * Cria uma instância de Paciente a partir de um objeto JSON
     * @param {Object} json - Objeto JSON
     * @returns {Paciente} Instância de Paciente
     */
    static fromJSON(json) {
        const paciente = new Paciente(
            json.nome,
            json.cpf,
            json.email,
            json.telefone,
            json.dataNascimento
        );
        paciente.id = json.id;
        paciente.dataCadastro = json.dataCadastro;
        return paciente;
    }

    /**
     * Valida os dados do paciente
     * @returns {Object} Resultado da validação
     */
    validar() {
        const erros = [];

        if (!this.nome || this.nome.trim().length < 3) {
            erros.push('Nome deve ter pelo menos 3 caracteres');
        }

        if (!ValidationUtils.validarCPF(this.cpf)) {
            erros.push('CPF inválido');
        }

        if (!ValidationUtils.validarEmail(this.email)) {
            erros.push('E-mail inválido');
        }

        if (!this.telefone || this.telefone.trim().length < 10) {
            erros.push('Telefone deve ter pelo menos 10 dígitos');
        }

        if (!this.dataNascimento) {
            erros.push('Data de nascimento é obrigatória');
        }

        return {
            valido: erros.length === 0,
            erros: erros
        };
    }
}
