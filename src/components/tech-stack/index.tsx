import {
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiMui,
    SiStyledcomponents,
    SiNodedotjs,
    SiExpress,
    SiSupabase,
    SiMongodb,
    SiGooglecloud,
    SiVercel,
    SiCloudflare,
    SiNetlify,
    SiDocker,
    SiLinux,
    SiFirebase,
    SiGit,
    SiGithub,
    SiPostman,
    SiNpm,
    SiVim,
    SiLazyvim,
} from "react-icons/si";

const techStack = [
    {
        category: "Languages",
        items: [
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        ],
    },
    {
        category: "Frontend",
        items: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
            { name: "Material Joy UI", icon: SiMui, color: "#007FFF" },
            { name: "Styled Components", icon: SiStyledcomponents, color: "#DB7093" },
        ],
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Express", icon: SiExpress, color: "#000000" },
            { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        ],
    },
    {
        category: "Cloud & DevOps",
        items: [
            { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
            { name: "Vercel", icon: SiVercel, color: "#000000" },
            { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
            { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Linux", icon: SiLinux, color: "#000000" },
            { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        ],
    },
    {
        category: "Developer Tools",
        items: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub", icon: SiGithub, color: "#181717" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "npm", icon: SiNpm, color: "#CB3837" },
            { name: "Vim", icon: SiVim, color: "#019733" },
            { name: "LazyVim", icon: SiLazyvim, color: "#C4C4C4" },
        ],
    },
];

export default function TechStack() {
    return (
        <section className="mx-auto min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white" id="tech-stack">

            {/* Header */}
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Tech Stack</h1>
                <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                    Technologies and tools I use to build scalable web applications.
                </p>
            </header>

            {/* Stack */}
            <div className="space-y-12">
                {techStack.map((group) => (
                    <div key={group.category}>
                        <h2 className="mb-6 text-2xl font-semibold">
                            {group.category}
                        </h2>

                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                            {group.items.map((tech) => {
                                const Icon = tech.icon;
                                return (
                                    <div
                                        key={tech.name}
                                        className="group flex items-center gap-4 rounded-lg border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                    >
                                        <Icon
                                            className="h-6 w-6"
                                            style={{ color: tech.color }}
                                        />
                                        <span className="text-sm font-medium">
                                            {tech.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
