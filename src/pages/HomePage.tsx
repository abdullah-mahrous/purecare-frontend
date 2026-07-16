import BaseBtn from "../components/BaseBtn";
import heroImg from "../assets/hero-img.png";

function HomePage() {
  return (
    <main>
      <section
        className="relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden rounded-b-[3rem] bg-cover bg-[position:58%_center] px-5 pb-8 pt-64 text-white sm:min-h-[36rem] sm:rounded-b-[4rem] sm:bg-center sm:px-8 sm:pt-72 lg:min-h-[42rem] lg:px-12 lg:pt-80"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-primary via-primary/85 to-transparent" />

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-end text-center">
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Compassionate Care at Your Doorstep in Alexandria
          </h1>

          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
            Immediate professional home healthcare services for your loved ones.
          </p>

          <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3">
            <BaseBtn className="bg-secondary text-white">Call Now</BaseBtn>
            <BaseBtn className="bg-secondary text-white">WhatsApp</BaseBtn>
            <BaseBtn className="bg-white text-primary">Request Service</BaseBtn>
          </div>

          <p className="mt-5 text-sm font-medium text-white/90">Serving all Alexandria</p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
