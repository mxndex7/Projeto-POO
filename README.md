# Clínica Mente Clara - Sistema de Gestão


## Sobre o Projeto

Sistema de gestão para clínica de psicologia, desenvolvido com tecnologias web modernas. O projeto permite o cadastro e gerenciamento de psicólogos, pacientes e agendamento de consultas, com interface intuitiva e funcionalidades avançadas de organização.

## Tecnologias Utilizadas

- **HTML5**: Estruturação semântica das páginas
- **CSS3**: Estilização moderna com:
  - Variáveis CSS personalizadas
  - Grid Layout e Flexbox
  - Design responsivo mobile-first
  - Animações e transições suaves
- **JavaScript (ES6+)**: Funcionalidades dinâmicas incluindo:
  - Programação Orientada a Objetos
  - Gerenciamento de estado com LocalStorage
  - Validação de formulários em tempo real
  - Sistema de autenticação
  - Filtros dinâmicos
  - Manipulação avançada do DOM

## Funcionalidades

### **Gestão de Psicólogos**
- Cadastro completo com validação de CRP
- Configuração de horários de trabalho por dia da semana
- Definição de especialidades
- Controle de disponibilidade

### **Gestão de Pacientes**
- Cadastro com validação de CPF
- Informações de contato completas
- Histórico de consultas
- Sistema de busca por nome

### **Sistema de Agendamentos**
- Verificação automática de disponibilidade
- Filtros por psicólogo e data
- Visualização de horários livres
- Prevenção de conflitos de horário

### **Consultas**
- Listagem completa de consultas agendadas
- Filtros por psicólogo e paciente
- Status de consultas (agendada, realizada, cancelada)
- Histórico completo

### **Sistema de Autenticação**
- Login seguro para administradores
- Controle de sessão
- Proteção de rotas

## Demonstração

O sistema pode ser acessado em: ...

## Arquitetura do Projeto

```
📁 Clínica Mente Clara/
├── 📁 css/
│   └── style.css                 # Estilos principais
├── 📁 js/
│   ├── 📁 models/               # Classes do domínio
│   │   ├── Clinica.js           # Gerenciador principal
│   │   ├── Psicologo.js         # Modelo de psicólogo
│   │   ├── Paciente.js          # Modelo de paciente
│   │   └── Consulta.js          # Modelo de consulta
│   ├── 📁 utils/                # Utilitários
│   │   └── validation.js        # Validações e formatações
│   ├── auth.js                  # Sistema de autenticação
│   ├── landing.js               # Página principal
│   ├── agendamento.js           # Funcionalidades de agendamento
│   ├── consulta.js              # Gestão de consultas
│   ├── paciente.js              # Gestão de pacientes
│   └── psicologo.js            # Gestão de psicólogos
├── index.html                   # Página de login
├── landing.html                 # Dashboard principal
├── cadastro-psicologo.html      # Cadastro de psicólogos
├── cadastro-paciente.html       # Cadastro de pacientes
├── agendamentos.html            # Sistema de agendamento
└── consultas.html               # Visualização de consultas
```

## Padrões de Desenvolvimento

### **Models (Modelos)**
Classes que representam as entidades principais:
- **Programação Orientada a Objetos**
- **Validação de dados integrada**
- **Serialização JSON para persistência**
- **Métodos de busca e manipulação**

### **Utils (Utilitários)**
Funções reutilizáveis para:
- **Validação de CPF, CRP, e-mail e telefone**
- **Formatação de dados para exibição**
- **Expressões regulares otimizadas**

## Responsividade

O sistema foi desenvolvido com abordagem mobile-first, funcionando perfeitamente em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1200px+)

## Objetivos Técnicos

Este projeto foi desenvolvido focando em:
- **Performance**: Código otimizado e carregamento rápido
- **Usabilidade**: Interface intuitiva e fácil navegação
- **Manutenibilidade**: Código modular e bem documentado
- **Escalabilidade**: Arquitetura preparada para expansão
- **Acessibilidade**: Seguindo padrões de inclusão digital

## Validações Implementadas

- ✅ **CPF**: Algoritmo completo de validação
- ✅ **CRP**: Formato específico para psicólogos
- ✅ **E-mail**: Regex otimizada
- ✅ **Telefone**: Formatos brasileiros
- ✅ **Datas**: Prevenção de agendamentos no passado
- ✅ **Horários**: Verificação de disponibilidade

## Como Executar o Projeto

1. **Clone este repositório**
   ```bash
   git clone https://github.com/seuusuario/clinica-mente-clara.git
   ```

2. **Abra o projeto no Replit ou servidor local**
   - Clique no botão "Run" no Replit
   - Ou abra `index.html` em seu navegador

3. **Credenciais de acesso**
   - Usuário: `admin`
   - Senha: `123456`

## Persistência de Dados

O sistema utiliza **LocalStorage** para persistência dos dados, mantendo as informações mesmo após fechar o navegador. Os dados são automaticamente:
- ✅ Salvos a cada operação
- ✅ Carregados na inicialização
- ✅ Validados antes do armazenamento



Desenvolvido por Guilherme Mendes - Projeto Academico Back-end.

---

⭐ Se gostou deste projeto, não se esqueça de dar uma estrela no repositório!

