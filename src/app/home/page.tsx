import Hero from "@/app/home/partials/hero";
import About from "@/app/home/partials/about";
import Services from "@/app/home/partials/services";

const home = () => {
  return (
    <section className="">
      <div className="pt-10 pb-20">
      <Hero />
      </div>
      <About />
      <div className="pt-42 pb-20">
      <Services />
      </div>
    </section>
  );
};

export default home;
