import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import {
  SiGithub,
  SiInstagram,
  SiGmail,
} from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";


export const CONTACT = {
  name: "Sujit Gouda",
  email: "sujit.gda997@gmail.com",
  socials: {
    github: "https://github.com/Meesujit/",
    linkedin: "https://linkedin.com/in/",
    instagram: "https://instagram.com/sujit.kumar.gouda",
    twitter: "https://twitter.com/sujit6ouda",
  },
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-10 text-black dark:border-zinc-800 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-6xl flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {[
              { href: "/#about", label: "Experience" },
              { href: "/#projects", label: "Projects" },
              { href: "/git-profile", label: "Git Profile" },
              { href: "/#contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-black dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <Link
              href={CONTACT.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <SiGithub className="h-5 w-5" />
            </Link>

            <Link
              href={CONTACT.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-600 transition hover:text-[#0A66C2] dark:text-zinc-400"
            >
              <SlSocialLinkedin className="h-5 w-5" />
            </Link>

            <Link
              href={`mailto:${CONTACT.email}`}
              aria-label="Email"
              className="text-zinc-600 transition hover:text-red-600 dark:text-zinc-400"
            >
              <SiGmail className="h-5 w-5" />
            </Link>

            <Link
              href={CONTACT.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-zinc-600 transition hover:text-pink-500 dark:text-zinc-400"
            >
              <SiInstagram className="h-5 w-5" />
            </Link>
            <Link
              href={CONTACT.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-zinc-600 transition hover:text-blue-400 dark:text-zinc-400"
            >
              <RiTwitterXFill className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-center border-t border-zinc-100 pt-8 dark:border-zinc-900 sm:justify-start">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
