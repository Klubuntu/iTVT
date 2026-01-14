import React, { useState } from "react";

const AccordionItem = ({ index, title, description, active, handleToggle }) => {
  return (
    <div className="accordion-item border-b border-blue-500/30 last:border-b-0 hover:bg-blue-500/10 transition-colors duration-300">
      <h2 className="accordion-header">
        <button
          className="accordion-button text-left text-gray-200 hover:text-blue-300 transition-colors duration-300 font-medium"
          aria-expanded={active === index}
          aria-controls={`accordion-${index + 1}`}
          onClick={() => handleToggle(index)}
        >
          {title}
          <span className={`inline-block transition-transform duration-300 ${active === index ? 'rotate-180' : ''}`}>
            <strong>▼</strong>
          </span>
        </button>
      </h2>
      <div
        className={`accordion-panel ${active === index ? "block" : "hidden"} bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-l-4 border-blue-500/50`}
        aria-labelledby={`accordion-${index + 1}`}
        aria-hidden={active !== index}
      >
        <p className="text-gray-300">{description?.trim() ? description : 'brak opisu'}</p>
      </div>
    </div>
  );
};

const AccordionBox = ({programs}) => {
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    setActive(index === active ? null : index);
  };

  return (
    <div className="accordion">
      {programs.map((program, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={`${program.startTime} - ${program.endTime} | ${program.title}`}
          description={program.description}
          active={active}
          handleToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default AccordionBox;