
/**
 * Funcionalidade da página de consultas
 */
document.addEventListener('DOMContentLoaded', function() {
    // Carregar filtros
    carregarFiltros();
    
    // Carregar consultas
    listarConsultas();
});

/**
 * Carrega os filtros de psicólogo e paciente
 */
function carregarFiltros() {
    const filtroPsicologo = document.getElementById('filtroPsicologo');
    const filtroPaciente = document.getElementById('filtroPaciente');
    
    // Carregar psicólogos
    const psicologos = clinica.listarPsicologos();
    filtroPsicologo.innerHTML = '<option value="">Todos os psicólogos</option>';
    psicologos.forEach(psicologo => {
        const option = document.createElement('option');
        option.value = psicologo.id;
        option.textContent = psicologo.nome;
        filtroPsicologo.appendChild(option);
    });
    
    // Carregar pacientes
    const pacientes = clinica.listarPacientes();
    filtroPaciente.innerHTML = '<option value="">Todos os pacientes</option>';
    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        filtroPaciente.appendChild(option);
    });
}

/**
 * Lista todas as consultas
 */
function listarConsultas() {
    const lista = document.getElementById('listaConsultas');
    const consultas = clinica.listarConsultas();
    
    exibirConsultas(consultas, lista);
}

/**
 * Aplica filtros às consultas
 */
function aplicarFiltros() {
    const filtroPsicologo = document.getElementById('filtroPsicologo').value;
    const filtroPaciente = document.getElementById('filtroPaciente').value;
    const lista = document.getElementById('listaConsultas');
    
    let consultas = clinica.listarConsultas();
    
    // Filtrar por psicólogo
    if (filtroPsicologo) {
        consultas = consultas.filter(c => c.psicologoId === filtroPsicologo);
    }
    
    // Filtrar por paciente
    if (filtroPaciente) {
        consultas = consultas.filter(c => c.pacienteId === filtroPaciente);
    }
    
    exibirConsultas(consultas, lista);
}

/**
 * Exibe consultas no elemento fornecido
 */
function exibirConsultas(consultas, elemento) {
    if (consultas.length === 0) {
        elemento.innerHTML = '<p>Nenhuma consulta encontrada.</p>';
        return;
    }
    
    // Ordenar consultas por data e horário
    consultas.sort((a, b) => {
        const dataA = new Date(`${a.data}T${a.horario}`);
        const dataB = new Date(`${b.data}T${b.horario}`);
        return dataA - dataB;
    });
    
    elemento.innerHTML = consultas.map(consulta => {
        const paciente = clinica.buscarPaciente(consulta.pacienteId);
        const psicologo = clinica.buscarPsicologo(consulta.psicologoId);
        
        const statusClass = getStatusClass(consulta.status);
        const isPassado = consulta.isPassado();
        const isHoje = consulta.isHoje();
        
        return `
            <div class="item-lista ${statusClass}">
                <h4>Consulta - ${ValidationUtils.formatarData(consulta.data)} às ${ValidationUtils.formatarHorario(consulta.horario)}</h4>
                <p><strong>Paciente:</strong> ${paciente ? paciente.nome : 'Não encontrado'}</p>
                <p><strong>Psicólogo:</strong> ${psicologo ? psicologo.nome : 'Não encontrado'}</p>
                <p><strong>Status:</strong> ${getStatusTexto(consulta.status)}</p>
                ${isHoje ? '<p><strong>🔔 CONSULTA HOJE</strong></p>' : ''}
                ${isPassado && consulta.status === 'agendada' ? '<p><strong>⚠️ CONSULTA VENCIDA</strong></p>' : ''}
                ${consulta.observacoes ? `<p><strong>Observações:</strong> ${consulta.observacoes}</p>` : ''}
                <p><strong>Agendada em:</strong> ${ValidationUtils.formatarData(consulta.dataCriacao.split('T')[0])}</p>
                <div class="acoes-consulta">
                    ${consulta.status === 'agendada' && !isPassado ? `
                        <button onclick="marcarRealizada('${consulta.id}')" class="btn-pequeno btn-sucesso">Marcar Realizada</button>
                        <button onclick="cancelarConsulta('${consulta.id}')" class="btn-pequeno btn-cancelar">Cancelar</button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Obtém a classe CSS para o status da consulta
 */
function getStatusClass(status) {
    switch (status) {
        case 'agendada': return 'status-agendada';
        case 'realizada': return 'status-realizada';
        case 'cancelada': return 'status-cancelada';
        default: return '';
    }
}

/**
 * Obtém o texto para exibição do status
 */
function getStatusTexto(status) {
    switch (status) {
        case 'agendada': return 'Agendada';
        case 'realizada': return 'Realizada';
        case 'cancelada': return 'Cancelada';
        default: return status;
    }
}

/**
 * Marca uma consulta como realizada
 */
function marcarRealizada(consultaId) {
    const observacoes = prompt('Observações da consulta (opcional):');
    if (observacoes !== null) { // null = cancelou o prompt
        const consulta = clinica.consultas.find(c => c.id === consultaId);
        if (consulta) {
            consulta.marcarRealizada(observacoes);
            clinica.salvarDados();
            aplicarFiltros();
            mostrarMensagem('Consulta marcada como realizada!', 'success');
        }
    }
}

/**
 * Cancela uma consulta
 */
function cancelarConsulta(consultaId) {
    const motivo = prompt('Motivo do cancelamento (opcional):');
    if (motivo !== null) { // null = cancelou o prompt
        const consulta = clinica.consultas.find(c => c.id === consultaId);
        if (consulta) {
            consulta.cancelar(motivo);
            clinica.salvarDados();
            aplicarFiltros();
            mostrarMensagem('Consulta cancelada!', 'success');
        }
    }
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
    
    const container = document.querySelector('.container');
    container.insertBefore(div, container.firstChild);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        div.remove();
    }, 5000);
}

// Adicionar estilos específicos para consultas
const style = document.createElement('style');
style.textContent = `
    .status-agendada {
        border-left-color: #3498db;
    }
    
    .status-realizada {
        border-left-color: #27ae60;
    }
    
    .status-cancelada {
        border-left-color: #e74c3c;
    }
    
    .acoes-consulta {
        margin-top: 10px;
        display: flex;
        gap: 10px;
    }
    
    .btn-pequeno {
        padding: 5px 10px;
        font-size: 0.8rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .btn-sucesso {
        background-color: #27ae60;
        color: white;
    }
    
    .btn-cancelar {
        background-color: #e74c3c;
        color: white;
    }
    
    .btn-pequeno:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
