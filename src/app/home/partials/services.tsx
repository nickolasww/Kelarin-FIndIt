import Card from '@/components/card/pricingcard/index'

export default function Services (){ 
    return( 
        <div className="flex items-center justify-center gap-5"> 
            <div className="w-1/2 flex flex-col items-center justify-center text-center ">
                <h1 className="text-5xl text-purple-600 font-bold px-32 ">Select The Best Plan For Your Needs</h1>
            </div>
            <div className="w-1/2 px-10">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
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
                isCurrentPlan={true}
                classname='text-lg text-center'
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
                isCurrentPlan={false}
                classname="text-lg pt-[22px] text-center "
                /> 
            </div>
            </div>
        </div>
    )
}