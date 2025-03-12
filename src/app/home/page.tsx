import Hero from "@/app/home/partials/hero"
import About from "@/app/home/partials/about"
import Services from "@/app/home/partials/services"

const home = () => {
    return (
      <section className="">
        <Hero />
        <About />
        <Services />
      </section>
    );
  };
  
  export default home ;