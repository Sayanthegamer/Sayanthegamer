import re

with open("src/components/ProjectModal.tsx", "r") as f:
    content = f.read()

# Replace the specific button rendering
old_button = """<a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors"
                                >
                                    <ExternalLink size={18} />
                                    View Live Demo
                                </a>"""

new_button = """{project.demo ? (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        View Live Demo
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-500 font-medium cursor-not-allowed"
                                    >
                                        (live demo coming soon...)
                                    </button>
                                )}"""

if old_button in content:
    content = content.replace(old_button, new_button)
    with open("src/components/ProjectModal.tsx", "w") as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Could not find old button to patch")
