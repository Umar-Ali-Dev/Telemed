import AccordionItem from "../../../../components/ui/accordion/AccordionItem";

const HealthHistory = () => {
  const historyData = [
    {
      question: "Do you have any current medical conditions (e.g., diabetes)?",
      answer: "No specific medical conditions reported at this time.",
      isOpen: false,
    },
    {
      question: "Do you smoke or use tobacco products?",
      answer: "Yes, allergic to penicillin and peanuts.", // Matching your image text
      isOpen: true,
    },
    {
      question:
        "Has anyone in your family been diagnosed with genetic disorder?",
      answer:
        "Father has a history of Type 2 Diabetes; no known genetic disorders.",
      isOpen: false,
    },
    {
      question: "How often do you exercise?",
      answer: "Light walking twice a week.",
      isOpen: false,
    },
  ];

  return (
    <div className="mt-6">
      {historyData.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          defaultOpen={item.isOpen}
        />
      ))}
    </div>
  );
};

export default HealthHistory;
