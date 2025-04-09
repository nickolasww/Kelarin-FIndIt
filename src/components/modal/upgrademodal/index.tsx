import React, { useState } from "react";
import { useEffect } from "react";
import PricingCard from "@/components/card/pricingcard";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false)

     useEffect(() => {
       setIsModalOpen(isOpen)
     }, [isOpen])

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-14 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold pb-10 text-purple-800">Upgrade your Plan</h1>
        <div className="grid grid-cols-2 gap-4 ">
        <PricingCard
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
        <PricingCard
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
            classname="text-lg  text-center pb-2 pt-6"
          />
        </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default UpgradeModal;
