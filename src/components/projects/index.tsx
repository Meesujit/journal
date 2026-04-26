"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";

const projects = [
    {
        title: "Sounf",
        tag: 'Noisiv Consulting',
        description: "Sounf is an all-in-one marketing SaaS designed to help digital marketers simplify campaigns, boost engagement, and drive measurable results.",
        tech: ["Vite", "Node.js", "REST API", "Mongodb", "Postman","Styled Components"],
        link: 'https://sounf.noisivconsulting.com'
    },    
    {
        title: "Compare Shiksha",
        description: "A comprehensive platform for students to compare and choose the best educational institutions based on various criteria such as courses, fees, location, and reviews.",
        tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Cloudflare"],
        link: "https://compareshiksha.com",
    },
    {
        title: "Mentozo",
        description: "A comprehensive platform for students to enroll in Online courses, track progress, and access learning materials.",
        tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Cloudflare"],
        link: "https://mentozo.com",
    },
    {
        title: "Zemsto",
        description: "A Modern Payment platform for students to pay their fees online with ease and convenience.",
        tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Cloudflare"],
        link: "https://zemsto.com",
    },
    {
        title: "Educollege Lead Generation Platform",
        description:
            "A production-ready marketing website built to capture and manage leads, improving conversion rates and performance.",
        tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Netlify & Hostinger"],
        link: "https://educollegee.netlify.app",
    },
    {
        title: "Filter Film Studio",
        tag: "Freelance",
        description:
            "A sleek and modern website for a Wedding film studio, showcasing their portfolio, services, and contact information with engaging visuals.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel", "Firebase"],
        link: "https://filter-film-wedding.vercel.app",
    },
    {
        title: "Cheese Corner Cafe",
        tag: "Freelance",
        description:
            "A delightful website for a cafe, showcasing their menu, ambiance, and location with smooth animations and responsive design.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Cloudflare"],
        link: "https://cheese-corner.pages.dev",
    },
    {
        title: "CA Meena Venkatesh",
        tag: "Freelance",
        description:
            "A professional website for a Chartered Accountant, highlighting services, expertise, and client testimonials with a clean design.",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "Cloudflare"],
        link: "https://cameenavenkatesh.co.in/",
    },
    {
        title: "Soul Sea Resorts",
        tag: "Freelance",
        description:
            "A captivating website for a resort, showcasing amenities, booking options, and scenic views with an immersive user experience.",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "Cloudflare"],
        link: "https://soulsearesort.com",
    },
    {
        title: "Real Estate Dashboard",
        description:
            "A comprehensive dashboard for real estate management, featuring property listings, analytics, and user management functionalities.",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "SQLite", "Vercel", "Docker"],
        link: "https://real-estate-dashboard-example.com",
    },
];

const INITIAL_VISIBLE = 4;

export default function Projects() {
    const [view, setView] = useState<"list" | "grid">("grid");
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll
        ? projects
        : projects.slice(0, INITIAL_VISIBLE);

    return (
        <section className="mx-auto min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white" id="projects">

            {/* Header */}
            <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Projects
                    </h1>
                    <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
                        A selection of projects demonstrating my skills and experience.
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView("list")}
                        className={`rounded-md border p-2 transition ${view === "list"
                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                : "border-zinc-300 dark:border-zinc-700"
                            }`}
                        aria-label="List view"
                    >
                        <List className="h-4 w-4" />
                    </button>

                    <button
                        onClick={() => setView("grid")}
                        className={`rounded-md border p-2 transition ${view === "grid"
                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                : "border-zinc-300 dark:border-zinc-700"
                            }`}
                        aria-label="Grid view"
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </button>
                </div>
            </header>

            {/* Projects */}
            <div
                className={
                    view === "grid"
                        ? "grid gap-8 sm:grid-cols-2"
                        : "space-y-6"
                }
            >
                {visibleProjects.map((project, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold">{project.title}</h2>

                                {project.tag && (
                                    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                                        {project.tag}
                                    </span>
                                )}
                            </div>

                            <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                                {project.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Visit Website →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            {!showAll && projects.length > INITIAL_VISIBLE && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setShowAll(true)}
                        className="rounded-md border cursor-pointer border-zinc-300 px-6 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                        Load More Projects
                    </button>
                </div>
            )}
        </section>
    );
}
