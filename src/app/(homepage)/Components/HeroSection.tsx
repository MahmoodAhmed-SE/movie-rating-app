import Image from "next/image";

export default function HeroSection() {
    return (
        <section
        aria-labelledby="hero-heading"
        className="text-white h-80 bg-blue-500 p-6 flex flex-row justify-between items-center gap-4"
      >
        <div>
          <div className="pb-3">
            <h1 id="hero-heading" className="text-4xl font-bold">
              Discover. Rate. Review.
            </h1>
            <p className="text-lg">
              Explore a world of movies rated by real fans.
            </p>
          </div>
          <nav aria-label="Primary Actions" className="flex gap-4">
            <button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-md">
              Browse Movies
            </button>
            <button className="bg-transparent border border-white text-white font-semibold px-4 py-2 rounded-md">
              Login to Rate
            </button>
          </nav>
        </div>
        <div className="hidden md:flex">
          <Image
            src={"/images/django.jpg"}
            alt={"Django movie cover image."}
            width={300}
            height={200}
          />
        </div>
      </section>
    );
}