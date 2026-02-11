// Aplicação principal
let audioEngine;
let sequencer;

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
    // Criar motor de áudio
    audioEngine = new AudioEngine();
    
    // Criar sequenciador
    sequencer = new Sequencer(audioEngine);
    sequencer.createGrid();

    // Configurar controles
    setupControls();

    // Configurar instrumentos
    setupInstruments();

    console.log('Opus Maker inicializado!');
});

function setupControls() {
    // Botão Play
    const playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', async () => {
        if (!audioEngine.initialized) {
            await audioEngine.initialize();
        }
        sequencer.play();
        playBtn.disabled = true;
        document.getElementById('stop-btn').disabled = false;
    });

    // Botão Stop
    const stopBtn = document.getElementById('stop-btn');
    stopBtn.addEventListener('click', () => {
        sequencer.stop();
        playBtn.disabled = false;
        stopBtn.disabled = true;
    });
    stopBtn.disabled = true;

    // Botão Clear
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar o padrão?')) {
            sequencer.clear();
            playBtn.disabled = false;
            stopBtn.disabled = true;
        }
    });

    // Controle de Tempo
    const tempoSlider = document.getElementById('tempo');
    const tempoValue = document.getElementById('tempo-value');
    tempoSlider.addEventListener('input', (e) => {
        const tempo = e.target.value;
        tempoValue.textContent = tempo;
        sequencer.setTempo(parseInt(tempo));
    });

    // Controle de Volume
    const volumeSlider = document.getElementById('volume');
    const volumeValue = document.getElementById('volume-value');
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        volumeValue.textContent = volume;
        if (audioEngine.initialized) {
            audioEngine.setVolume(parseInt(volume));
        }
    });
}

function setupInstruments() {
    const instruments = document.querySelectorAll('.instrument-item');
    
    instruments.forEach(instrument => {
        instrument.addEventListener('click', async () => {
            const sound = instrument.dataset.sound;
            
            if (!audioEngine.initialized) {
                await audioEngine.initialize();
            }
            
            audioEngine.playSound(sound);
            
            // Feedback visual
            instrument.style.transform = 'scale(0.95)';
            setTimeout(() => {
                instrument.style.transform = '';
            }, 100);
        });
    });
}

// Adicionar padrões de exemplo
function loadExamplePattern(patternName) {
    const patterns = {
        'basic': {
            'kick': [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            'snare': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            'hihat': [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            'clap': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        'techno': {
            'kick': [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            'snare': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            'hihat': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            'clap': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]
        }
    };

    if (patterns[patternName]) {
        const pattern = patterns[patternName];
        Object.keys(pattern).forEach(track => {
            sequencer.pattern[track] = pattern[track].map(v => Boolean(v));
        });
        sequencer.createGrid();
    }
}
