
/**
 * Funcionalidade da página de cadastro de psicólogos
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formPsicologo');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const crp = document.getElementById('crp').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const especialidade = document.getElementById('especialidade').value.trim();
        
        const psicologo = new Psicologo(nome, crp, email, telefone, especialidade);
        const resultado = clinica.adicionarPsicologo(psicologo);
        
        if (resultado.sucesso) {
            mostrarMensagem('Psicólogo cadastrado com sucesso!', 'success');
            form.reset();
            listarPsicologos();
        } else {
            mostrarMensagem('Erro: ' + resultado.erros.join(', '), 'error');
        }
    });
    
    // Carregar lista inicial
    listarPsicologos();
});

/**
 * Lista todos os psicólogos cadastrados
 */
function listarPsicologos() {
    const lista = document.getElementById('listaPsicologos');
    const psicologos = clinica.listarPsicologos();
    
    if (psicologos.length === 0) {
        lista.innerHTML = '<p>Nenhum psicólogo cadastrado.</p>';
        return;
    }
    
    lista.innerHTML = psicologos.map(psicologo => `
        <div class="item-lista">
            <h4>${psicologo.nome}</h4>
            <p><strong>CRP:</strong> ${psicologo.crp}</p>
            <p><strong>E-mail:</strong> ${psicologo.email}</p>
            <p><strong>Telefone:</strong> ${ValidationUtils.formatarTelefone(psicologo.telefone)}</p>
            <p><strong>Especialidade:</strong> ${psicologo.especialidade}</p>
            <p><strong>Cadastrado em:</strong> ${ValidationUtils.formatarData(psicologo.dataCadastro.split('T')[0])}</p>
        </div>
    `).join('');
}

/**
 * Mostra mensagem de feedback para o usuário
 */
function mostrarMensagem(mensagem, tipo) {
    // Remove mensagem anterior se existir
    const mensgemAnterior = document.querySelector('.alert');
    if (mensgemAnterior) {
        mensgemAnterior.remove();
    }
    
    const div = document.createElement('div');
    div.className = `alert alert-${tipo}`;
    div.textContent = mensagem;
    
    const form = document.getElementById('formPsicologo');
    form.parentNode.insertBefore(div, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        div.remove();
    }, 5000);
}
