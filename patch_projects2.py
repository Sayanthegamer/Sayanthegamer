with open("src/components/Projects.tsx", "r") as f:
    content = f.read()

# Fix the dangling comma caused by our previous replacement
content = content.replace("},\n,", "},")

# For the type issue where selectedProject expects demo to be present but we made it optional,
# we need to make sure the ProjectModal type definition is being properly imported or the internal type is correct.
# Wait, the error is because `typeof projects[0]` is unioned. We should explicitly type `projects` array as `Project[]`.
# Let's import Project from ProjectModal if it's exported, or redefine it here.
# Let's just define a local Project interface and use it for the array.

project_interface = """
export interface Project {
    title: string;
    description: string;
    longDescription?: string;
    challenges?: string[];
    features?: string[];
    tech: string[];
    github: string;
    demo?: string;
    image: string;
}

const projects: Project[] = [
"""

# Replace `const projects = [` with the typed one
content = content.replace("const projects = [", project_interface)

# Also fix the `typeof projects[0]` to just `Project`
content = content.replace("<typeof projects[0] | null>", "<Project | null>")

with open("src/components/Projects.tsx", "w") as f:
    f.write(content)
