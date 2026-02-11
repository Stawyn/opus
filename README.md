# 🎵 Opus Maker - Criador de Música Digital

Bem-vindo ao **Opus Maker**, um projeto de recriação de um sequenciador de batidas estilo "Maker" para criação de música digital diretamente no navegador.

## 📋 Sobre o Projeto

O Opus Maker é uma aplicação web interativa que permite criar padrões de batidas e ritmos usando uma interface de sequenciador de grid. Inspirado em drum machines clássicas, permite que você:

- 🥁 Crie padrões de bateria com múltiplas tracks
- 🎚️ Controle tempo (BPM) e volume
- ▶️ Reproduza suas composições em tempo real
- 🎨 Interface visual intuitiva e responsiva

## 🚀 Como Usar

### Abrir o Aplicativo

1. Simplesmente abra o arquivo `index.html` em seu navegador web moderno
2. Não requer instalação ou servidor - funciona 100% no navegador!

### Criar um Padrão

1. **Clique nas células** do grid para ativar/desativar notas
   - Cada linha representa um instrumento diferente
   - Cada coluna representa um tempo no compasso (16 steps)

2. **Ajuste os controles:**
   - **Tempo (BPM):** Controla a velocidade da reprodução (60-180 BPM)
   - **Volume:** Ajusta o volume geral (0-100%)

3. **Teste os sons:**
   - Clique nos instrumentos na seção "Instrumentos" para ouvir cada som

4. **Controles de reprodução:**
   - **▶️ Play:** Inicia a reprodução do padrão
   - **⏹️ Stop:** Para a reprodução
   - **🗑️ Limpar:** Remove todas as notas do padrão

## 🎼 Instrumentos Disponíveis

- **🥁 Kick:** Bumbo (grave)
- **🥁 Snare:** Caixa
- **🎩 Hi-Hat:** Chimbal
- **👏 Clap:** Palma

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura da aplicação
- **CSS3:** Estilização e animações
- **JavaScript (ES6+):** Lógica da aplicação
- **Web Audio API:** Síntese e reprodução de áudio em tempo real

## 📁 Estrutura do Projeto

```
opus/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   ├── audioEngine.js  # Motor de áudio (Web Audio API)
│   ├── sequencer.js    # Lógica do sequenciador
│   └── app.js          # Aplicação principal e controles
└── README.md           # Este arquivo
```

## 🎯 Funcionalidades

### Implementadas ✅

- [x] Sequenciador de grid 16 steps
- [x] 4 instrumentos de percussão sintéticos
- [x] Controle de tempo (BPM)
- [x] Controle de volume
- [x] Reprodução em loop
- [x] Interface visual responsiva
- [x] Feedback visual durante reprodução
- [x] Teste individual de instrumentos

### Futuras Melhorias 🚀

- [ ] Adicionar mais instrumentos
- [ ] Salvar e carregar padrões
- [ ] Exportar áudio para arquivo
- [ ] Múltiplos padrões/cenas
- [ ] Efeitos de áudio (reverb, delay)
- [ ] Suporte para samples customizados
- [ ] Modo de gravação ao vivo

## 🎨 Capturas de Tela

O Opus Maker apresenta uma interface moderna e intuitiva com:
- Gradiente roxo vibrante
- Grid interativo com feedback visual
- Controles deslizantes suaves
- Design responsivo para diferentes tamanhos de tela

## 🤝 Contribuindo

Este é um projeto de código aberto. Sinta-se livre para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal e educacional.

## 👨‍💻 Autor

Projeto de recriação do Maker desenvolvido para demonstração de conceitos de Web Audio API e design de interfaces musicais.

---

**Opus Maker © 2026** - Criando música, um padrão por vez! 🎵
