
/**
 * Classe Psicologo - Representa um psicólogo da clínica
 */
class Psicologo {
    /**
     * Construtor da classe Psicologo
     * @param {string} nome - Nome completo do psicólogo
     * @param {string} crp - Número do CRP
     * @param {string} email - E-mail do psicólogo
     * @param {string} telefone - Telefone do psicólogo
     * @param {string} especialidade - Especialidade do psicólogo
     */
    constructor(nome, crp, email, telefone, especialidade, diasDisponiveis = [], horariosDisponiveis = []) {
        this.id = this.gerarId();
        this.nome = nome;
        this.crp = crp;
        this.email = email;
        this.telefone = telefone;
        this.especialidade = especialidade;
        this.diasDisponiveis = diasDisponiveis; // Array de números (0=domingo, 1=segunda, etc.)
        this.horariosDisponiveis = horariosDisponiveis; // Array de horários no formato "HH:MM"
        this.dataCadastro = new Date().toISOString();
    }

    /**
     * Gera um ID único para o psicólogo
     * @returns {string} ID único
     */
    gerarId() {
        return 'psi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} Objeto JSON
     */
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            crp: this.crp,
            email: this.email,
            telefone: this.telefone,
            especialidade: this.especialidade,
            diasDisponiveis: this.diasDisponiveis,
            horariosDisponiveis: this.horariosDisponiveis,
            dataCadastro: this.dataCadastro
        };
    }

    /**
     * Cria uma instância de Psicologo a partir de um objeto JSON
     * @param {Object} json - Objeto JSON
     * @returns {Psicologo} Instância de Psicologo
     */
    static fromJSON(json) {
        const psicologo = new Psicologo(
            json.nome,
            json.crp,
            json.email,
            json.telefone,
            json.especialidade,
            json.diasDisponiveis || [],
            json.horariosDisponiveis || []
        );
        psicologo.id = json.id;
        psicologo.dataCadastro = json.dataCadastro;
        return psicologo;
    }

    /**
     * Valida os dados do psicólogo
     * @returns {Object} Resultado da validação
     */
    validar() {
        const erros = [];

        if (!this.nome || this.nome.trim().length < 3) {
            erros.push('Nome deve ter pelo menos 3 caracteres');
        }

        if (!this.crp || this.crp.trim().length === 0) {
            erros.push('CRP é obrigatório');
        }

        if (!ValidationUtils.validarEmail(this.email)) {
            erros.push('E-mail inválido');
        }

        if (!this.telefone || this.telefone.trim().length < 10) {
            erros.push('Telefone deve ter pelo menos 10 dígitos');
        }

        if (!this.especialidade || this.especialidade.trim().length < 3) {
            erros.push('Especialidade deve ter pelo menos 3 caracteres');
        }

        if (!this.diasDisponiveis || this.diasDisponiveis.length === 0) {
            erros.push('Pelo menos um dia deve ser selecionado');
        }

        if (!this.horariosDisponiveis || this.horariosDisponiveis.length === 0) {
            erros.push('Pelo menos um horário deve ser selecionado');
        }

        return {
            valido: erros.length === 0,
            erros: erros
        };
    }

    /**
     * Verifica se o psicólogo está disponível em determinado dia da semana e horário
     * @param {string} data - Data no formato YYYY-MM-DD
     * @param {string} horario - Horário no formato HH:MM
     * @returns {boolean} True se disponível
     */
    estaDisponivel(data, horario) {
        const diaSemana = new Date(data).getDay();
        return this.diasDisponiveis.includes(diaSemana) && 
               this.horariosDisponiveis.includes(horario);
    }

    /**
     * Obtém os horários disponíveis para uma data específica
     * @param {string} data - Data no formato YYYY-MM-DD
     * @returns {Array} Array de horários disponíveis
     */
    obterHorariosParaData(data) {
        const diaSemana = new Date(data).getDay();
        if (!this.diasDisponiveis.includes(diaSemana)) {
            return [];
        }
        return this.horariosDisponiveis;
    }
}
