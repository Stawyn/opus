// Motor de áudio usando Web Audio API
class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.volume = 0.7;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.createSounds();
            this.initialized = true;
        } catch (error) {
            console.error('Erro ao inicializar áudio:', error);
        }
    }

    // Criar sons sintéticos para cada instrumento
    async createSounds() {
        // Kick drum (bumbo)
        this.sounds.kick = () => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            gain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            osc.start(this.audioContext.currentTime);
            osc.stop(this.audioContext.currentTime + 0.5);
        };

        // Snare drum (caixa)
        this.sounds.snare = () => {
            const noise = this.audioContext.createBufferSource();
            const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.2, this.audioContext.sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < noiseBuffer.length; i++) {
                noiseData[i] = Math.random() * 2 - 1;
            }
            
            noise.buffer = noiseBuffer;
            
            const noiseFilter = this.audioContext.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 1000;
            
            const noiseGain = this.audioContext.createGain();
            
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(this.audioContext.destination);
            
            noiseGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            noise.start(this.audioContext.currentTime);
            noise.stop(this.audioContext.currentTime + 0.2);
        };

        // Hi-hat (chimbal)
        this.sounds.hihat = () => {
            const noise = this.audioContext.createBufferSource();
            const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.05, this.audioContext.sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < noiseBuffer.length; i++) {
                noiseData[i] = Math.random() * 2 - 1;
            }
            
            noise.buffer = noiseBuffer;
            
            const noiseFilter = this.audioContext.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 7000;
            
            const noiseGain = this.audioContext.createGain();
            
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(this.audioContext.destination);
            
            noiseGain.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
            
            noise.start(this.audioContext.currentTime);
            noise.stop(this.audioContext.currentTime + 0.05);
        };

        // Clap (palma)
        this.sounds.clap = () => {
            const noise = this.audioContext.createBufferSource();
            const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < noiseBuffer.length; i++) {
                noiseData[i] = Math.random() * 2 - 1;
            }
            
            noise.buffer = noiseBuffer;
            
            const noiseFilter = this.audioContext.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.value = 2000;
            
            const noiseGain = this.audioContext.createGain();
            
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(this.audioContext.destination);
            
            noiseGain.gain.setValueAtTime(this.volume * 0.7, this.audioContext.currentTime);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            noise.start(this.audioContext.currentTime);
            noise.stop(this.audioContext.currentTime + 0.1);
        };
    }

    playSound(soundName) {
        if (!this.initialized) {
            console.warn('Motor de áudio não inicializado');
            return;
        }

        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    setVolume(value) {
        this.volume = value / 100;
    }
}
