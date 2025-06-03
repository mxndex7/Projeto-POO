
/**
 * Sistema de autenticação e controle de sessão
 */
class AuthSystem {
    constructor() {
        this.timeoutId = null;
        this.timeoutDuration = 60000; // 1 minuto em millisegundos
        this.iniciarMonitoramento();
    }

    /**
     * Realiza o login do usuário
     * @param {string} usuario - Nome de usuário
     * @param {string} senha - Senha do usuário
     * @returns {boolean} True se login bem sucedido
     */
    login(usuario, senha) {
        // Credenciais simples para demonstração
        if (usuario === 'admin' && senha === '123456') {
            sessionStorage.setItem('usuarioLogado', usuario);
            sessionStorage.setItem('loginTime', new Date().getTime());
            this.resetarTimeout();
            return true;
        }
        return false;
    }

    /**
     * Realiza o logout do usuário
     */
    logout() {
        sessionStorage.removeItem('usuarioLogado');
        sessionStorage.removeItem('loginTime');
        this.limparTimeout();
        window.location.href = 'index.html';
    }

    /**
     * Verifica se o usuário está logado
     * @returns {boolean} True se logado
     */
    isLogado() {
        return sessionStorage.getItem('usuarioLogado') !== null;
    }

    /**
     * Obtém o usuário logado
     * @returns {string|null} Nome do usuário ou null
     */
    getUsuarioLogado() {
        return sessionStorage.getItem('usuarioLogado');
    }

    /**
     * Verifica se a sessão expirou
     * @returns {boolean} True se expirou
     */
    sessaoExpirou() {
        const loginTime = sessionStorage.getItem('loginTime');
        if (!loginTime) return true;
        
        const agora = new Date().getTime();
        const tempoDecorrido = agora - parseInt(loginTime);
        
        return tempoDecorrido > this.timeoutDuration;
    }

    /**
     * Inicia o monitoramento de inatividade
     */
    iniciarMonitoramento() {
        // Eventos que resetam o timeout
        const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        
        eventos.forEach(evento => {
            document.addEventListener(evento, () => {
                if (this.isLogado()) {
                    this.resetarTimeout();
                }
            }, true);
        });
    }

    /**
     * Reseta o timeout de inatividade
     */
    resetarTimeout() {
        this.limparTimeout();
        
        this.timeoutId = setTimeout(() => {
            alert('Sessão expirada por inatividade. Você será redirecionado para o login.');
            this.logout();
        }, this.timeoutDuration);
    }

    /**
     * Limpa o timeout de inatividade
     */
    limparTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    /**
     * Protege uma página verificando se o usuário está logado
     */
    protegerPagina() {
        if (!this.isLogado() || this.sessaoExpirou()) {
            alert('Acesso negado. Faça login para continuar.');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
}

// Instância global do sistema de autenticação
const authSystem = new AuthSystem();

// Proteção automática de páginas (exceto login)
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage !== 'index.html' && currentPage !== '') {
        authSystem.protegerPagina();
        
        // Exibir usuário logado se existir elemento
        const usuarioElement = document.getElementById('usuarioLogado');
        if (usuarioElement) {
            usuarioElement.textContent = `Logado como: ${authSystem.getUsuarioLogado()}`;
        }
        
        // Configurar botão de logout se existir
        const btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                authSystem.logout();
            });
        }
    }
});
