
/**
 * Funcionalidade da página de cadastro de pacientes
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formPaciente');
    const campoBusca = document.getElementById('buscaPaciente');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const dataNascimento = document.getElementById('dataNascimento').value;
        
        const paciente = new Paciente(nome, cpf, email, telefone, dataNascimento);
        const resultado = clinica.adicionarPaciente(paciente);
        
        if (resultado.sucesso) {
            mostrarMensagem('Paciente cadastrado com sucesso!', 'success');
            form.reset();
            listarPacientes();
        } else {
            mostrarMensagem('Erro: ' + resultado.erros.join(', '), 'error');
        }
    });
    
    // Busca em tempo real
    campoBusca.addEventListener('input', function() {
        const termo = this.value.trim();
        if (termo.length >= 2) {
            buscarPacientes(termo);
        } else {
            listarPacientes();
        }
    });
    
    // Máscara para CPF
    document.getElementById('cpf').addEventListener('input', function() {
        let value = this.value.replace(/[^\d]/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            this.value = value;
        }
    });
    
    // Carregar lista inicial
    listarPacientes();
});

/**
 * Lista todos os pacientes cadastrados
 */
function listarPacientes() {
    const lista = document.getElementById('listaPacientes');
    const pacientes = clinica.listarPacientes();
    
    exibirListaPacientes(pacientes, lista);
}

/**
 * Busca pacientes por nome
 */
function buscarPacientes(termo) {
    const lista = document.getElementById('listaPacientes');
    const pacientes = clinica.buscarPacientesPorNome(termo);
    
    exibirListaPacientes(pacientes, lista);
}

/**
 * Exibe lista de pacientes no elemento fornecido
 */
function exibirListaPacientes(pacientes, elemento) {
    if (pacientes.length === 0) {
        elemento.innerHTML = '<p>Nenhum paciente encontrado.</p>';
        return;
    }
    
    elemento.innerHTML = pacientes.map(paciente => `
        <div class="item-lista">
            <h4>${paciente.nome}</h4>
            <p><strong>CPF:</strong> ${ValidationUtils.formatarCPF(paciente.cpf)}</p>
            <p><strong>E-mail:</strong> ${paciente.email}</p>
            <p><strong>Telefone:</strong> ${ValidationUtils.formatarTelefone(paciente.telefone)}</p>
            <p><strong>Data de Nascimento:</strong> ${ValidationUtils.formatarData(paciente.dataNascimento)}</p>
            <p><strong>Idade:</strong> ${paciente.calcularIdade()} anos</p>
            <p><strong>Cadastrado em:</strong> ${ValidationUtils.formatarData(paciente.dataCadastro.split('T')[0])}</p>
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
    
    const form = document.getElementById('formPaciente');
    form.parentNode.insertBefore(div, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        div.remove();
    }, 5000);
}
