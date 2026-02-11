// Sequenciador de batidas
class Sequencer {
    constructor(audioEngine) {
        this.audioEngine = audioEngine;
        this.tracks = ['kick', 'snare', 'hihat', 'clap', 'tom', 'cymbal'];
        this.steps = 16;
        this.currentStep = 0;
        this.isPlaying = false;
        this.tempo = 120; // BPM
        this.intervalId = null;
        this.pattern = {};
        
        this.initializePattern();
    }

    initializePattern() {
        this.tracks.forEach(track => {
            this.pattern[track] = new Array(this.steps).fill(false);
        });
    }

    createGrid() {
        const grid = document.getElementById('beat-grid');
        grid.innerHTML = '';

        this.tracks.forEach((track, trackIndex) => {
            // Label da track
            const label = document.createElement('div');
            label.className = 'beat-label';
            label.textContent = this.getTrackLabel(track);
            grid.appendChild(label);

            // Células da track
            for (let step = 0; step < this.steps; step++) {
                const cell = document.createElement('div');
                cell.className = 'beat-cell';
                cell.dataset.track = track;
                cell.dataset.step = step;
                
                if (this.pattern[track][step]) {
                    cell.classList.add('active');
                }

                cell.addEventListener('click', () => {
                    this.toggleStep(track, step);
                });

                grid.appendChild(cell);
            }
        });
    }

    getTrackLabel(track) {
        const labels = {
            'kick': '🥁 Kick',
            'snare': '🥁 Snare',
            'hihat': '🎩 Hi-Hat',
            'clap': '👏 Clap',
            'tom': '🥁 Tom',
            'cymbal': '🥁 Cymbal'
        };
        return labels[track] || track;
    }

    toggleStep(track, step) {
        this.pattern[track][step] = !this.pattern[track][step];
        this.updateCell(track, step);
    }

    updateCell(track, step) {
        const cell = document.querySelector(
            `.beat-cell[data-track="${track}"][data-step="${step}"]`
        );
        if (cell) {
            cell.classList.toggle('active', this.pattern[track][step]);
        }
    }

    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        const stepDuration = (60 / this.tempo) * 1000 / 4; // Dividir por 4 para 16th notes
        
        this.intervalId = setInterval(() => {
            this.playStep();
        }, stepDuration);
    }

    playStep() {
        // Limpar highlight anterior
        document.querySelectorAll('.beat-cell.playing').forEach(cell => {
            cell.classList.remove('playing');
        });

        // Tocar sons ativos neste step
        this.tracks.forEach(track => {
            if (this.pattern[track][this.currentStep]) {
                this.audioEngine.playSound(track);
            }

            // Adicionar highlight visual
            const cell = document.querySelector(
                `.beat-cell[data-track="${track}"][data-step="${this.currentStep}"]`
            );
            if (cell) {
                cell.classList.add('playing');
            }
        });

        // Avançar para o próximo step
        this.currentStep = (this.currentStep + 1) % this.steps;
    }

    stop() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.currentStep = 0;
        
        // Limpar highlights
        document.querySelectorAll('.beat-cell.playing').forEach(cell => {
            cell.classList.remove('playing');
        });
    }

    clear() {
        this.stop();
        this.initializePattern();
        this.createGrid();
    }

    setTempo(bpm) {
        this.tempo = bpm;
        if (this.isPlaying) {
            this.stop();
            this.play();
        }
    }

    savePattern() {
        const patternData = {
            pattern: this.pattern,
            tempo: this.tempo,
            timestamp: new Date().toISOString()
        };
        const dataStr = JSON.stringify(patternData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `opus-pattern-${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    loadPattern(patternData) {
        this.stop();
        if (patternData.pattern) {
            this.pattern = patternData.pattern;
        }
        if (patternData.tempo) {
            this.tempo = patternData.tempo;
            document.getElementById('tempo').value = this.tempo;
            document.getElementById('tempo-value').textContent = this.tempo;
        }
        this.createGrid();
    }

    loadPreset(presetName) {
        const presets = {
            'basic': {
                'kick': [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                'snare': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'hihat': [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                'clap': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                'tom': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                'cymbal': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            },
            'techno': {
                'kick': [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                'snare': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'hihat': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                'clap': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'tom': [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
                'cymbal': [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
            },
            'hiphop': {
                'kick': [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
                'snare': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'hihat': [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1],
                'clap': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'tom': [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
                'cymbal': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            },
            'house': {
                'kick': [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                'snare': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'hihat': [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
                'clap': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                'tom': [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
                'cymbal': [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }
        };

        if (presets[presetName]) {
            const pattern = presets[presetName];
            Object.keys(pattern).forEach(track => {
                if (this.pattern[track]) {
                    this.pattern[track] = pattern[track].map(v => Boolean(v));
                }
            });
            this.createGrid();
        }
    }
}
