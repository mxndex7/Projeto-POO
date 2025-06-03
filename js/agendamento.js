
/**
 * Funcionalidade da página de agendamentos
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAgendamento');
    const selectPaciente = document.getElementById('paciente');
    const selectPsicologo = document.getElementById('psicologo');
    const inputData = document.getElementById('data');
    const selectHorario = document.getElementById('horario');
    
    // Carregar dados iniciais
    carregarPacientes();
    carregarPsicologos();
    
    // Configurar data mínima (hoje)
    const hoje = new Date().toISOString().split('T')[0];
    inputData.min = hoje;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const pacienteId = selectPaciente.value;
        const psicologoId = selectPsicologo.value;
        const data = inputData.value;
        const horario = selectHorario.value;
        
        const consulta = new Consulta(pacienteId, psicologoId, data, horario);
        const resultado = clinica.adicionarConsulta(consulta);
        
        if (resultado.sucesso) {
            mostrarMensagem('Consulta agendada com sucesso!', 'success');
            form.reset();
            atualizarHorarios();
        } else {
            mostrarMensagem('Erro: ' + resultado.erros.join(', '), 'error');
        }
    });
    
    // Atualizar horários quando psicólogo ou data mudarem
    selectPsicologo.addEventListener('change', atualizarHorarios);
    inputData.addEventListener('change', atualizarHorarios);
});

/**
 * Carrega pacientes no select
 */
function carregarPacientes() {
    const select = document.getElementById('paciente');
    const pacientes = clinica.listarPacientes();
    
    select.innerHTML = '<option value="">Selecione um paciente</option>';
    
    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        select.appendChild(option);
    });
}

/**
 * Carrega psicólogos no select
 */
function carregarPsicologos() {
    const select = document.getElementById('psicologo');
    const psicologos = clinica.listarPsicologos();
    
    select.innerHTML = '<option value="">Selecione um psicólogo</option>';
    
    psicologos.forEach(psicologo => {
        const option = document.createElement('option');
        option.value = psicologo.id;
        option.textContent = `${psicologo.nome} - ${psicologo.especialidade}`;
        select.appendChild(option);
    });
}

/**
 * Atualiza os horários disponíveis
 */
function atualizarHorarios() {
    const selectHorario = document.getElementById('horario');
    const psicologoId = document.getElementById('psicologo').value;
    const data = document.getElementById('data').value;
    
    selectHorario.innerHTML = '<option value="">Selecione um horário</option>';
    
    if (!psicologoId || !data) {
        exibirHorariosDisponiveis([]);
        return;
    }
    
    const horariosDisponiveis = clinica.obterHorariosDisponiveis(psicologoId, data);
    
    horariosDisponiveis.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = ValidationUtils.formatarHorario(horario);
        selectHorario.appendChild(option);
    });
    
    exibirHorariosDisponiveis(horariosDisponiveis);
}

/**
 * Exibe horários disponíveis visualmente
 */
function exibirHorariosDisponiveis(horariosDisponiveis) {
    const container = document.getElementById('horariosDisponiveis');
    const todosHorarios = Consulta.gerarHorariosDisponiveis();
    
    if (todosHorarios.length === 0) {
        container.innerHTML = '<p>Selecione um psicólogo e uma data para ver os horários.</p>';
        return;
    }
    
    container.innerHTML = todosHorarios.map(horario => {
        const disponivel = horariosDisponiveis.includes(horario);
        const classe = disponivel ? 'horario-item' : 'horario-item horario-ocupado';
        const status = disponivel ? 'Disponível' : 'Ocupado';
        
        return `<span class="${classe}" title="${status}">${ValidationUtils.formatarHorario(horario)}</span>`;
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
    
    const form = document.getElementById('formAgendamento');
    form.parentNode.insertBefore(div, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        div.remove();
    }, 5000);
}
