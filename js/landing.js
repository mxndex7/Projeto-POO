
/**
 * Funcionalidade da página principal (landing)
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    if (!authSystem.protegerPagina()) {
        return;
    }
    
    // Exibir informações resumidas
    exibirResumoClinica();
});

/**
 * Exibe um resumo dos dados da clínica
 */
function exibirResumoClinica() {
    const container = document.querySelector('.container');
    
    // Criar seção de resumo
    const resumoDiv = document.createElement('div');
    resumoDiv.className = 'resumo-clinica';
    resumoDiv.innerHTML = `
        <h2>Resumo da Clínica</h2>
        <div class="estatisticas">
            <div class="estatistica">
                <h3>${clinica.listarPsicologos().length}</h3>
                <p>Psicólogos Cadastrados</p>
            </div>
            <div class="estatistica">
                <h3>${clinica.listarPacientes().length}</h3>
                <p>Pacientes Cadastrados</p>
            </div>
            <div class="estatistica">
                <h3>${clinica.listarConsultas().length}</h3>
                <p>Consultas Agendadas</p>
            </div>
            <div class="estatistica">
                <h3>${clinica.listarConsultas().filter(c => c.isHoje()).length}</h3>
                <p>Consultas Hoje</p>
            </div>
        </div>
    `;
    
    // Inserir antes do menu
    const menuGrid = document.querySelector('.menu-grid');
    container.insertBefore(resumoDiv, menuGrid);
    
    // Adicionar estilos para o resumo
    const style = document.createElement('style');
    style.textContent = `
        .resumo-clinica {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .resumo-clinica h2 {
            color: #2c3e50;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .estatisticas {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .estatistica {
            text-align: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        
        .estatistica h3 {
            font-size: 2rem;
            color: #3498db;
            margin-bottom: 0.5rem;
        }
        
        .estatistica p {
            color: #666;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
}
