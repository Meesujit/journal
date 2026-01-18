import About from "@/src/components/about";
import Contact from "@/src/components/contact";
import Hero from "@/src/components/hero";
import Projects from "@/src/components/projects";
import TechStack from "@/src/components/tech-stack";


export default function Home(){
  return(
    <>
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </>
  )
}