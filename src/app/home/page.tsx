import Hero from "@/app/home/partials/hero";
import About from "@/app/home/partials/about";
import Services from "@/app/home/partials/services";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const home = () => {
  return (
    <section className="">
      <Navbar/>
      <div className="pt-10 pb-20">
      <Hero />
      </div>
      <About />
      <div className="pt-42 pb-20">
      <Services />
      </div>
      <Footer />
    </section>
  );
};

export default home;
