import Image from "next/image";

export default function Contact() {
    return (
        <section className="mx-auto min-h-screen px-6 py-16 bg-white text-black dark:bg-black dark:text-white" id="contact">

            {/* Header */}
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                    Have a project in mind or just want to say hello?
                    Feel free to reach out.
                </p>
            </header>

            <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-24">
                {/* Contact Info */}
                <div className="max-w-lg space-y-6">
                    {/* <h2 className="text-2xl font-semibold">Feel Free to Reach Out</h2>
                    <p className="text-zinc-700 dark:text-zinc-300">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p> */}
                    <div>
                        <Image
                            src="/cat.svg"
                            alt="Contact Illustration"
                            width={400}
                            height={300}
                            className="mx-auto"
                        />
                    </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-6 flex-1 max-w-lg" action="#" method="POST">
                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            rows={5}
                            placeholder="Tell me about your project..."
                            className="w-full resize-none rounded-md border border-zinc-300 bg-transparent px-4 py-2 text-sm focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Alternative Contact */}
            <div className="mt-12 border-t border-zinc-200 pt-6 text-sm dark:border-zinc-800">
                <p className="text-zinc-600 dark:text-zinc-400">
                    Or reach me directly at:
                </p>
                <a
                    href="mailto:sujit.gda997@gmail.com"
                    className="mt-2 inline-block font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                    your-sujit.gda997@gmail.com
                </a>
            </div>
        </section>
    );
}
