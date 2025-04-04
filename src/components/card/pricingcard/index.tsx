import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  isCurrentPlan: boolean;
  classname: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, buttonText, isCurrentPlan, classname }) => {
  const priceParts = price.split(' ');

  return (
    <div className={`border rounded-lg p-4 md:p-6 ${isCurrentPlan ? 'border-black' : ''}`}>
      <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{title}</h2>
      <ul className="mb-3 md:mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-1 md:mb-2">
            {feature.startsWith('X') ? (
              <span className="text-red-500 mr-2">❌</span>
            ) : (
              <span className="text-green-500 mr-2">✔️</span>
            )}
            <span>{feature.replace(/^X\s|^✔️\s/, '')}</span>
          </li>
        ))}
      </ul>
      <p className={`${classname} text-lg md:text-base`}>
        {priceParts[0]} <span className="text-purple-600 text-xl md:text-2xl font-semibold">{priceParts[1]}</span> {priceParts.slice(2).join(' ')}
      </p>
      <button className={`w-full py-2 md:py-3 px-3 md:px-4 rounded-lg cursor-pointer ${isCurrentPlan ? 'bg-purple-600 text-white font-semibold' : 'border-2 border-purple-600 text-purple-600 font-semibold'}`}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;