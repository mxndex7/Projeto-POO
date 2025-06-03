
/**
 * Funcionalidade da página de login
 */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Verificar se já está logado
    if (authSystem.isLogado() && !authSystem.sessaoExpirou()) {
        window.location.href = 'landing.html';
        return;
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value.trim();
        
        if (!usuario || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (authSystem.login(usuario, senha)) {
            window.location.href = 'landing.html';
        } else {
            alert('Usuário ou senha incorretos. Use: admin / 123456');
            document.getElementById('senha').value = '';
        }
    });
    
    // Focar no campo de usuário
    document.getElementById('usuario').focus();
});
