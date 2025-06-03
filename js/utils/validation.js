
/**
 * Utilitários de validação usando regex
 */
class ValidationUtils {
    /**
     * Valida CPF usando regex e algoritmo de verificação
     * @param {string} cpf - CPF a ser validado
     * @returns {boolean} True se válido
     */
    static validarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, '');
        
        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;
        
        // Verifica se não são todos os dígitos iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validação usando algoritmo do CPF
        let soma = 0;
        let resto;
        
        // Primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        // Segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }

    /**
     * Valida e-mail usando regex
     * @param {string} email - E-mail a ser validado
     * @returns {boolean} True se válido
     */
    static validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    /**
     * Valida telefone brasileiro
     * @param {string} telefone - Telefone a ser validado
     * @returns {boolean} True se válido
     */
    static validarTelefone(telefone) {
        // Remove caracteres não numéricos
        telefone = telefone.replace(/[^\d]/g, '');
        
        // Verifica se tem 10 ou 11 dígitos (com ou sem 9 inicial no celular)
        const regex = /^(\d{10}|\d{11})$/;
        return regex.test(telefone);
    }

    /**
     * Formata CPF para exibição
     * @param {string} cpf - CPF a ser formatado
     * @returns {string} CPF formatado
     */
    static formatarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    /**
     * Formata telefone para exibição
     * @param {string} telefone - Telefone a ser formatado
     * @returns {string} Telefone formatado
     */
    static formatarTelefone(telefone) {
        telefone = telefone.replace(/[^\d]/g, '');
        
        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (telefone.length === 10) {
            return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        
        return telefone;
    }

    /**
     * Formata data para exibição brasileira
     * @param {string} data - Data no formato YYYY-MM-DD
     * @returns {string} Data formatada
     */
    static formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    /**
     * Formata horário para exibição
     * @param {string} horario - Horário no formato HH:MM
     * @returns {string} Horário formatado
     */
    static formatarHorario(horario) {
        return horario + 'h';
    }
}
