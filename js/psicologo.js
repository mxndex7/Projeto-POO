
/**
 * Funcionalidade da página de cadastro de psicólogos
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formPsicologo');
    
    // Gerar grade de horários
    gerarGradeHorarios();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const crp = document.getElementById('crp').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const especialidade = document.getElementById('especialidade').value.trim();
        
        // Obter dias disponíveis
        const diasDisponiveis = Array.from(document.querySelectorAll('input[name="diasDisponiveis"]:checked'))
            .map(cb => parseInt(cb.value));
        
        // Obter horários disponíveis
        const horariosDisponiveis = Array.from(document.querySelectorAll('input[name="horariosDisponiveis"]:checked'))
            .map(cb => cb.value);
        
        const psicologo = new Psicologo(nome, crp, email, telefone, especialidade, diasDisponiveis, horariosDisponiveis);
        const resultado = clinica.adicionarPsicologo(psicologo);
        
        if (resultado.sucesso) {
            mostrarMensagem('Psicólogo cadastrado com sucesso!', 'success');
            form.reset();
            // Resetar checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            listarPsicologos();
        } else {
            mostrarMensagem('Erro: ' + resultado.erros.join(', '), 'error');
        }
    });
    
    // Carregar lista inicial
    listarPsicologos();
});

/**
 * Gera a grade de horários disponíveis para seleção
 */
function gerarGradeHorarios() {
    const container = document.getElementById('horariosGrid');
    const horarios = Consulta.gerarHorariosDisponiveis();
    
    container.innerHTML = horarios.map(horario => `
        <label class="horario-checkbox">
            <input type="checkbox" name="horariosDisponiveis" value="${horario}">
            ${ValidationUtils.formatarHorario ? ValidationUtils.formatarHorario(horario) : horario}
        </label>
    `).join('');
}

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
    
    lista.innerHTML = psicologos.map(psicologo => {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const diasTexto = psicologo.diasDisponiveis && psicologo.diasDisponiveis.length > 0 
            ? psicologo.diasDisponiveis.map(dia => diasSemana[dia]).join(', ')
            : 'Não definido';
        
        const horariosTexto = psicologo.horariosDisponiveis && psicologo.horariosDisponiveis.length > 0
            ? psicologo.horariosDisponiveis.map(h => ValidationUtils.formatarHorario ? ValidationUtils.formatarHorario(h) : h).join(', ')
            : 'Não definido';
        
        return `
            <div class="item-lista">
                <h4>${psicologo.nome}</h4>
                <p><strong>CRP:</strong> ${psicologo.crp}</p>
                <p><strong>E-mail:</strong> ${psicologo.email}</p>
                <p><strong>Telefone:</strong> ${ValidationUtils.formatarTelefone(psicologo.telefone)}</p>
                <p><strong>Especialidade:</strong> ${psicologo.especialidade}</p>
                <p><strong>Dias disponíveis:</strong> ${diasTexto}</p>
                <p><strong>Horários disponíveis:</strong> ${horariosTexto}</p>
                <p><strong>Cadastrado em:</strong> ${ValidationUtils.formatarData(psicologo.dataCadastro.split('T')[0])}</p>
                <div class="acoes-item">
                    <button onclick="excluirPsicologo('${psicologo.id}')" class="btn-excluir">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
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

/**
 * Exclui um psicólogo
 */
function excluirPsicologo(id) {
    const psicologo = clinica.buscarPsicologo(id);
    if (!psicologo) {
        mostrarMensagem('Psicólogo não encontrado!', 'error');
        return;
    }

    if (confirm(`Tem certeza que deseja excluir o psicólogo "${psicologo.nome}"?`)) {
        const resultado = clinica.removerPsicologo(id);
        
        if (resultado.sucesso) {
            mostrarMensagem('Psicólogo excluído com sucesso!', 'success');
            listarPsicologos();
        } else {
            mostrarMensagem('Erro: ' + resultado.erros.join(', '), 'error');
        }
    }
}
