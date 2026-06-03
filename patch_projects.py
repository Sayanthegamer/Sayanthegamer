import re
import json

with open("src/components/Projects.tsx", "r") as f:
    content = f.read()

new_projects_str = """
    {
        title: 'MuktaVidya',
        description: 'An open-source educational platform or tool.',
        longDescription: 'MuktaVidya is a Next.js project bootstrapped with create-next-app, providing an educational platform.',
        challenges: [
            'Building a robust Next.js application.',
            'Setting up a modern frontend environment.'
        ],
        features: [
            'Built with Next.js',
            'Optimized fonts with next/font',
            'Vercel deployment ready'
        ],
        tech: ['Next.js', 'TypeScript', 'CSS', 'JavaScript'],
        github: 'https://github.com/Sayanthegamer/MuktaVidya',
        demo: 'https://muktavidya.vercel.app/',
        image: '/muktavidya-preview.png',
    },
    {
        title: 'CircuitJS',
        description: 'An interactive, visual, and easy-to-use electronic circuit simulator right in your browser!',
        longDescription: 'CircuitJS is a web-based app that lets you design and test circuits visually. Whether you are a student learning about electricity for the first time, a hobbyist testing an idea, or just someone who likes playing with digital tools, CircuitJS makes electronics accessible to everyone.',
        challenges: [
            'Translating circuit drawing into mathematical matrix equations in real-time.',
            'Building a high-speed rendering engine using HTML5 Canvas for smooth animations.',
            'Ensuring the application is mobile-friendly with touch controls.'
        ],
        features: [
            'Drag & Drop Building',
            'Real-Time Visuals and Current Dots',
            'Voltage Color Indicators',
            'Fully Stocked Parts Bin (Batteries, Resistors, LEDs, etc.)',
            'Advanced Plotter for Voltage/Current over time'
        ],
        tech: ['React', 'TypeScript', 'Vite', 'HTML5 Canvas'],
        github: 'https://github.com/Sayanthegamer/circuitjs',
        demo: 'https://circuitjs.vercel.app/',
        image: '/circuitjs-preview.png',
    },
    {
        title: 'Lecture Notes Scribe',
        description: 'A cloud-native pipeline and extension that processes lecture videos to generate comprehensive study guides.',
        longDescription: 'A cloud-native, asynchronous pipeline and browser extension that processes lecture videos to generate comprehensive, textbook-quality study guides with LaTeX math equations and inline keyframe illustrations. Uses a decoupled state-machine model to handle long-running video processing tasks in distributed cloud environments.',
        challenges: [
            'Handling long-running video processing without blocking the web server.',
            'Bypassing ephemeral storage loss in cloud environments by uploading to Supabase.',
            'Preventing zombie subprocesses during FFmpeg execution with strict timeouts.'
        ],
        features: [
            'Asynchronous Video Processing Queue',
            'Multimodal AI Engine using Gemini API',
            'Inline Keyframe Extraction via FFmpeg',
            'Chrome Extension Integration',
            'Live Status Polling'
        ],
        tech: ['Python', 'FastAPI', 'Supabase', 'Google Gemini', 'Chrome Extension API', 'FFmpeg'],
        github: 'https://github.com/Sayanthegamer/lecture-notes-pipeline',
        image: '/lecture-notes-preview.png',
    }
"""

# Find the end of the projects array
match = re.search(r'\];\s*const Projects = \(\) => \{', content)

if match:
    insert_pos = match.start()

    # We want to insert the new projects right before the closing bracket of the array.
    # The last project ends with a closing brace `}` followed by possibly a comma and a newline.
    # We will just replace `];` with `, ` + new_projects_str + `];`

    new_content = content[:insert_pos] + ",\n" + new_projects_str + "\n" + content[insert_pos:]
    with open("src/components/Projects.tsx", "w") as f:
        f.write(new_content)
    print("Successfully added new projects")
else:
    print("Could not find the insertion point for projects")
