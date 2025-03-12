import Button from "@/components/button";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center p-32">
      <div className="flex flex-col gap-4  ">
        <h1 className="px-52 text-5xl font-bold text-purple-700">
          Stay Organized, Stay Motivated - Manage Tasks with Streak Rewards!
        </h1>
        <p className="px-[400px] mb-5">
          Kelarin combines Kanban-based task management with streak points to
          boost motivation and productivity{" "}
        </p>
        <div className="flex items-center justify-center gap-5">
          <Button
            className="bg-purple-800  p-3 font-semibold rounded-lg text-white cursor-pointer"
            text="Get Started"
          />
          <Button
            className="border-2 p-3 rounded-lg font-semibold border-purple-800 text-purple-800 bg-white cursor-pointer"
            text="Learn More"
          />
        </div>
      </div>
    </section>
  );
}
