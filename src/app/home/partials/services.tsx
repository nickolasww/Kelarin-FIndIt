import Card from '@/components/card/pricingcard/index';

export default function Services() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-5 p-4 md:p-8 lg:p-16">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl text-purple-600 font-bold px-4 md:px-0 lg:px-5 xl:px-20">
          Select The Best Plan For Your Needs
        </h1>
      </div>
      <div className="w-full md:w-1/2 px-4 md:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card
            title="Free"
            price="IDR 0 / always free"
            features={[
              "X No Custom Avatar (Profile shows first letter of workspace)",
              "X No custom header on the dashboard",
              "✔️ Upload photos & documents up to 10MB",
              "X Cannot upload videos",
            ]}
            buttonText="Your current Plan"
            isCurrentPlan={false}
            classname="text-lg text-center pb-2"
          />
          <Card
            title="Nitro"
            price="IDR 29.999 / month"
            features={[
              "✔️ Custom avatar (Upload your own profile picture)",
              "✔️ Custom header for dashboard",
              "✔️ Upload photos & documents up to 20MB",
              "✔️ Cannot upload videos",
            ]}
            buttonText="Upgrade to Nitro"
            isCurrentPlan={true}
            classname="text-lg  xl:pt-[25px] 2xl:pt-[50px] text-center pb-2"
          />
        </div>
      </div>
    </div>
  );
}