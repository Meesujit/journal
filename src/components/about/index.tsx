const experience = [
    {
        company: "Freelance",
        role: "Full Stack Developer",
        duration: "November 2025 - Present",
        description: [
            {
                text: "Designed and developed responsive websites for small businesses using Next.js, Tailwind CSS, enhancing their online presence.",
            },
            {
                text: "Implemented SEO best practices, resulting in improved search engine rankings and increased website traffic for clients.",
            },
            {
                text: "Provided ongoing website maintenance and updates, ensuring optimal performance and security.",
            }
        ]
    },
    {
        company: "Eduplor India",
        role: "Web Developer",
        duration: "July 2025 - January 2026",
        description: [
            {
                text: "Developed and maintained the company website using React and Next.js, ensuring a responsive and user-friendly experience.",
            },
            {
                text: "Collaborated with the design team to implement new features and improve site performance, resulting in a 20% increase in user engagement.",
            },
            {
                text: "Optimized website for SEO, leading to a 15% increase in organic traffic over six months.",
            }
        ]
    },
    {
        company: "Noisiv Consulting",
        role: "SDE Intern",
        duration: "Aug 2024 - March 2025",
        description: [
            {
                text: "Assisted in the development of internal tools using React and Vite, improving team productivity by 10%.",
            },
            {
                text: "Participated in code reviews and contributed to the optimization of existing codebases, enhancing application performance.",
            },
            {
                text: "Collaborated with cross-functional teams to gather requirements and deliver solutions that met business needs.",
            }
        ]
        
    }
];

export default function About() {
    return (
        <section className="mx-auto min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white">
            {/* Heading */}
            <header className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                    A brief overview of my professional experience and the work I’ve done.
                </p>
            </header>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="space-y-8">
                    {experience.map((exp, index) => (
                        <div key={index} className="relative pl-12">

                            {/* Timeline dot */}
                            <div className="absolute left-2 top-0 h-4 w-4 rounded-2xl bg-black dark:bg-white" />

                            {/* Content */}
                            <div className="">
                                <h2 className="text-2xl font-semibold">
                                    {exp.role}
                                    <span className="text-zinc-500 dark:text-zinc-400">
                                        {" "}· {exp.company}
                                    </span>
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    {exp.duration}
                                </p>

                                <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
                                    {exp.description.map((desc, idx) => (
                                        <span key={idx}>- {desc.text}<br /></span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
