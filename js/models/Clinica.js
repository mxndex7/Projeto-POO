
/**
 * Classe Clinica - Gerencia todos os dados da clínica
 */
class Clinica {
    constructor() {
        this.psicologos = [];
        this.pacientes = [];
        this.consultas = [];
        this.carregarDados();
    }

    /**
     * Carrega os dados do localStorage
     */
    carregarDados() {
        try {
            // Carregar psicólogos
            const psicologosData = localStorage.getItem('clinica_psicologos');
            if (psicologosData) {
                this.psicologos = JSON.parse(psicologosData).map(p => Psicologo.fromJSON(p));
            }

            // Carregar pacientes
            const pacientesData = localStorage.getItem('clinica_pacientes');
            if (pacientesData) {
                this.pacientes = JSON.parse(pacientesData).map(p => Paciente.fromJSON(p));
            }

            // Carregar consultas
            const consultasData = localStorage.getItem('clinica_consultas');
            if (consultasData) {
                this.consultas = JSON.parse(consultasData).map(c => Consulta.fromJSON(c));
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    /**
     * Salva os dados no localStorage
     */
    salvarDados() {
        try {
            localStorage.setItem('clinica_psicologos', JSON.stringify(this.psicologos.map(p => p.toJSON())));
            localStorage.setItem('clinica_pacientes', JSON.stringify(this.pacientes.map(p => p.toJSON())));
            localStorage.setItem('clinica_consultas', JSON.stringify(this.consultas.map(c => c.toJSON())));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }

    // ========== MÉTODOS PARA PSICÓLOGOS ==========

    /**
     * Adiciona um novo psicólogo
     * @param {Psicologo} psicologo - Instância de Psicologo
     * @returns {Object} Resultado da operação
     */
    adicionarPsicologo(psicologo) {
        const validacao = psicologo.validar();
        if (!validacao.valido) {
            return { sucesso: false, erros: validacao.erros };
        }

        // Verificar se CRP já existe
        if (this.psicologos.some(p => p.crp === psicologo.crp)) {
            return { sucesso: false, erros: ['CRP já cadastrado'] };
        }

        // Verificar se email já existe
        if (this.psicologos.some(p => p.email === psicologo.email)) {
            return { sucesso: false, erros: ['E-mail já cadastrado'] };
        }

        this.psicologos.push(psicologo);
        this.salvarDados();
        return { sucesso: true };
    }

    /**
     * Lista todos os psicólogos
     * @returns {Array} Array de psicólogos
     */
    listarPsicologos() {
        return this.psicologos;
    }

    /**
     * Busca psicólogo por ID
     * @param {string} id - ID do psicólogo
     * @returns {Psicologo|null} Psicólogo encontrado ou null
     */
    buscarPsicologo(id) {
        return this.psicologos.find(p => p.id === id) || null;
    }

    // ========== MÉTODOS PARA PACIENTES ==========

    /**
     * Adiciona um novo paciente
     * @param {Paciente} paciente - Instância de Paciente
     * @returns {Object} Resultado da operação
     */
    adicionarPaciente(paciente) {
        const validacao = paciente.validar();
        if (!validacao.valido) {
            return { sucesso: false, erros: validacao.erros };
        }

        // Verificar se CPF já existe
        if (this.pacientes.some(p => p.cpf === paciente.cpf)) {
            return { sucesso: false, erros: ['CPF já cadastrado'] };
        }

        // Verificar se email já existe
        if (this.pacientes.some(p => p.email === paciente.email)) {
            return { sucesso: false, erros: ['E-mail já cadastrado'] };
        }

        this.pacientes.push(paciente);
        this.salvarDados();
        return { sucesso: true };
    }

    /**
     * Lista todos os pacientes
     * @returns {Array} Array de pacientes
     */
    listarPacientes() {
        return this.pacientes;
    }

    /**
     * Busca paciente por ID
     * @param {string} id - ID do paciente
     * @returns {Paciente|null} Paciente encontrado ou null
     */
    buscarPaciente(id) {
        return this.pacientes.find(p => p.id === id) || null;
    }

    /**
     * Busca pacientes por nome
     * @param {string} nome - Nome ou parte do nome
     * @returns {Array} Array de pacientes encontrados
     */
    buscarPacientesPorNome(nome) {
        const nomeLower = nome.toLowerCase();
        return this.pacientes.filter(p => 
            p.nome.toLowerCase().includes(nomeLower)
        );
    }

    // ========== MÉTODOS PARA CONSULTAS ==========

    /**
     * Adiciona uma nova consulta
     * @param {Consulta} consulta - Instância de Consulta
     * @returns {Object} Resultado da operação
     */
    adicionarConsulta(consulta) {
        const validacao = consulta.validar();
        if (!validacao.valido) {
            return { sucesso: false, erros: validacao.erros };
        }

        // Verificar se horário está disponível
        if (!this.verificarHorarioDisponivel(consulta.psicologoId, consulta.data, consulta.horario)) {
            return { sucesso: false, erros: ['Horário não disponível'] };
        }

        this.consultas.push(consulta);
        this.salvarDados();
        return { sucesso: true };
    }

    /**
     * Lista todas as consultas
     * @returns {Array} Array de consultas
     */
    listarConsultas() {
        return this.consultas;
    }

    /**
     * Lista consultas por psicólogo
     * @param {string} psicologoId - ID do psicólogo
     * @returns {Array} Array de consultas
     */
    listarConsultasPorPsicologo(psicologoId) {
        return this.consultas.filter(c => c.psicologoId === psicologoId);
    }

    /**
     * Lista consultas por paciente
     * @param {string} pacienteId - ID do paciente
     * @returns {Array} Array de consultas
     */
    listarConsultasPorPaciente(pacienteId) {
        return this.consultas.filter(c => c.pacienteId === pacienteId);
    }

    /**
     * Verifica se um horário está disponível
     * @param {string} psicologoId - ID do psicólogo
     * @param {string} data - Data da consulta
     * @param {string} horario - Horário da consulta
     * @returns {boolean} True se disponível
     */
    verificarHorarioDisponivel(psicologoId, data, horario) {
        return !this.consultas.some(c => 
            c.psicologoId === psicologoId && 
            c.data === data && 
            c.horario === horario && 
            c.status !== 'cancelada'
        );
    }

    /**
     * Obtém horários disponíveis para um psicólogo em uma data
     * @param {string} psicologoId - ID do psicólogo
     * @param {string} data - Data da consulta
     * @returns {Array} Array de horários disponíveis
     */
    obterHorariosDisponiveis(psicologoId, data) {
        const todosHorarios = Consulta.gerarHorariosDisponiveis();
        const horariosOcupados = this.consultas
            .filter(c => 
                c.psicologoId === psicologoId && 
                c.data === data && 
                c.status !== 'cancelada'
            )
            .map(c => c.horario);

        return todosHorarios.filter(h => !horariosOcupados.includes(h));
    }
}

// Instância global da clínica
const clinica = new Clinica();
