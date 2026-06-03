import wave
import struct
import math

def generate_wave(filename, duration, frequency, type="click"):
    # 44100 Hz, 16-bit mono
    sample_rate = 44100
    num_samples = int(duration * sample_rate)
    
    # Open WAV file
    wav_file = wave.open(filename, 'w')
    wav_file.setparams((1, 2, sample_rate, num_samples, 'NONE', 'not compressed'))
    
    samples = []
    
    if type == "click":
        # Short click: simple decaying sine wave
        for i in range(num_samples):
            t = float(i) / sample_rate
            # Frequency decay for a pleasant tick/pop
            freq = frequency * math.exp(-25.0 * t)
            # Volume envelope (rapid exponential decay)
            volume = math.exp(-40.0 * t)
            value = int(volume * 16384.0 * math.sin(2.0 * math.pi * freq * t))
            data = struct.pack('<h', value)
            samples.append(data)
            
    elif type == "achievement":
        # Achievement fanfare: C major arpeggio (C4 -> E4 -> G4 -> C5)
        # We will split the duration into 4 steps
        step_samples = num_samples // 4
        notes = [261.63, 329.63, 392.00, 523.25] # C4, E4, G4, C5 frequencies
        
        for step in range(4):
            note_freq = notes[step]
            for i in range(step_samples):
                # Total time t
                total_i = step * step_samples + i
                t = float(total_i) / sample_rate
                
                # Note time (time since note started)
                nt = float(i) / sample_rate
                
                # Volume envelope per note (exponential decay)
                volume = math.exp(-6.0 * nt) * 0.8
                
                # Basic synth instrument: combination of sine and a little triangle wave for retro richness
                sine_val = math.sin(2.0 * math.pi * note_freq * t)
                tri_val = 2.0 * abs(2.0 * (t * note_freq - math.floor(t * note_freq + 0.5))) - 1.0
                wave_val = 0.7 * sine_val + 0.3 * tri_val
                
                value = int(volume * 16384.0 * wave_val)
                data = struct.pack('<h', value)
                samples.append(data)
                
    wav_file.writeframes(b''.join(samples))
    wav_file.close()
    print(f"Generated {filename}")

if __name__ == "__main__":
    # Generate in public folder
    generate_wave("public/click.wav", 0.08, 1200, "click")
    generate_wave("public/achievement.wav", 0.8, 261.63, "achievement")
