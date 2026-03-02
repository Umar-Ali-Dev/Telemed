const VisitPricing = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-[14px] font-medium text-[#0A1E25]">
        Asynchronous Visit Price
      </h3>
      <div className="max-w-xl">
        <input
          type="text"
          defaultValue="$ 200.00"
          className="w-full p-4 border border-[#D4CFCC] rounded-xl focus:outline-none focus:border-[#705295] text-[#0A1E25] font-medium"
        />
      </div>
    </div>
  );
};

export default VisitPricing;
