
/**
 * Classe Consulta - Representa uma consulta agendada
 */
class Consulta {
    /**
     * Construtor da classe Consulta
     * @param {string} pacienteId - ID do paciente
     * @param {string} psicologoId - ID do psicólogo
     * @param {string} data - Data da consulta (YYYY-MM-DD)
     * @param {string} horario - Horário da consulta (HH:MM)
     */
    constructor(pacienteId, psicologoId, data, horario) {
        this.id = this.gerarId();
        this.pacienteId = pacienteId;
        this.psicologoId = psicologoId;
        this.data = data;
        this.horario = horario;
        this.status = 'agendada'; // agendada, realizada, cancelada
        this.observacoes = '';
        this.dataCriacao = new Date().toISOString();
    }

    /**
     * Gera um ID único para a consulta
     * @returns {string} ID único
     */
    gerarId() {
        return 'con_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Obtém a data e hora completa da consulta
     * @returns {Date} Data e hora da consulta
     */
    getDataHoraCompleta() {
        return new Date(`${this.data}T${this.horario}:00`);
    }

    /**
     * Verifica se a consulta é no passado
     * @returns {boolean} True se a consulta é no passado
     */
    isPassado() {
        return this.getDataHoraCompleta() < new Date();
    }

    /**
     * Verifica se a consulta é hoje
     * @returns {boolean} True se a consulta é hoje
     */
    isHoje() {
        const hoje = new Date().toDateString();
        const dataConsulta = this.getDataHoraCompleta().toDateString();
        return hoje === dataConsulta;
    }

    /**
     * Cancela a consulta
     * @param {string} motivo - Motivo do cancelamento
     */
    cancelar(motivo = '') {
        this.status = 'cancelada';
        this.observacoes = motivo;
    }

    /**
     * Marca a consulta como realizada
     * @param {string} observacoes - Observações da consulta
     */
    marcarRealizada(observacoes = '') {
        this.status = 'realizada';
        this.observacoes = observacoes;
    }

    /**
     * Converte o objeto para JSON
     * @returns {Object} Objeto JSON
     */
    toJSON() {
        return {
            id: this.id,
            pacienteId: this.pacienteId,
            psicologoId: this.psicologoId,
            data: this.data,
            horario: this.horario,
            status: this.status,
            observacoes: this.observacoes,
            dataCriacao: this.dataCriacao
        };
    }

    /**
     * Cria uma instância de Consulta a partir de um objeto JSON
     * @param {Object} json - Objeto JSON
     * @returns {Consulta} Instância de Consulta
     */
    static fromJSON(json) {
        const consulta = new Consulta(
            json.pacienteId,
            json.psicologoId,
            json.data,
            json.horario
        );
        consulta.id = json.id;
        consulta.status = json.status || 'agendada';
        consulta.observacoes = json.observacoes || '';
        consulta.dataCriacao = json.dataCriacao;
        return consulta;
    }

    /**
     * Valida os dados da consulta
     * @returns {Object} Resultado da validação
     */
    validar() {
        const erros = [];

        if (!this.pacienteId) {
            erros.push('Paciente é obrigatório');
        }

        if (!this.psicologoId) {
            erros.push('Psicólogo é obrigatório');
        }

        if (!this.data) {
            erros.push('Data é obrigatória');
        } else {
            const dataConsulta = new Date(this.data);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            
            if (dataConsulta < hoje) {
                erros.push('Data da consulta não pode ser no passado');
            }
        }

        if (!this.horario) {
            erros.push('Horário é obrigatório');
        }

        return {
            valido: erros.length === 0,
            erros: erros
        };
    }

    /**
     * Gera os horários disponíveis para agendamento
     * @returns {Array} Array de horários disponíveis
     */
    static gerarHorariosDisponiveis() {
        const horarios = [];
        // Horários de 8h às 18h, de 30 em 30 minutos
        for (let i = 8; i <= 17; i++) {
            horarios.push(`${i.toString().padStart(2, '0')}:00`);
            horarios.push(`${i.toString().padStart(2, '0')}:30`);
        }
        // Adicionar último horário do dia
        horarios.push('18:00');
        return horarios;
    }
}
