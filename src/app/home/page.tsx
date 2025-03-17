import Hero from "@/app/home/partials/hero";
import About from "@/app/home/partials/about";
import Services from "@/app/home/partials/services";

const home = () => {
  return (
    <section className="">
      <div className="p-28">
        <Hero />
      </div>
      <About />
      <div className="p-56">
        <Services />
      </div>
    </section>
  );
};

export default home;
