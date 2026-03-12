import React from "react";

const Hero = () => {
  return (
    <section className="py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Provider Card */}
        <div className="relative overflow-hidden rounded-[32px] min-h-[450px] lg:min-h-[520px] group">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
            alt="Healthcare Provider"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Purple Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#705295]/95 via-[#705295]/80 to-transparent p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-white text-[32px] md:text-[42px] font-bold leading-tight mb-6 max-w-[400px]">
              Are You a Provider? Join Us & Grow Your Practice
            </h2>
            <p className="text-white/90 text-[16px] md:text-[18px] mb-10 max-w-[450px] leading-relaxed">
              Reach more patients, increase flexibility, and streamline visits
              with a secure, easy-to-use InstaVisitRx designed for licensed
              providers.
            </p>
            <button className="bg-white text-[#705295] font-bold py-4 px-10 rounded-xl w-fit transition-all hover:bg-gray-100 shadow-lg">
              Join as Provider
            </button>
          </div>
        </div>

        {/* Patient Card */}
        <div className="relative overflow-hidden rounded-[32px] min-h-[450px] lg:min-h-[520px] group">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
            alt="Patient Care"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Light Warm Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-[#0A1E25] text-[28px] md:text-[36px] font-bold leading-tight mb-6">
              Easily request asynchronous Telehealth visits, share your health
              concerns, and get professional medical guidance from trusted
              providers in minutes (more immediate)
            </h2>
            <button className="bg-[#705295] text-white font-bold py-4 px-10 rounded-xl w-fit transition-all hover:bg-[#5e447e] shadow-lg">
              Request Treatment Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
