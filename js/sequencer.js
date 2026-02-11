// Sequenciador de batidas
class Sequencer {
    constructor(audioEngine) {
        this.audioEngine = audioEngine;
        this.tracks = ['kick', 'snare', 'hihat', 'clap'];
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
            'clap': '👏 Clap'
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
}
