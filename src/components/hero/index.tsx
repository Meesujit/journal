import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-4 text-center dark:bg-black " id="home">
      <div className="container mx-auto flex flex-col items-center gap-6">
        <div className="">
          <Image
            src="/cat.svg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
        <div className="">
          <h1 className="text-4xl font-bold text-black dark:text-white sm:text-5xl">
            Hi, I'm <span className="satisfy-regular">Sujit Gouda !!</span>
          </h1>
          <p className="mt-4 text-2xl text-black dark:text-white/70">
            24yo developer.
          </p>
        </div>
      </div>
    </section>
  );
}
