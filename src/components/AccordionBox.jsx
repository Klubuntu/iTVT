import React, { useState } from "react";

const AccordionItem = ({ index, title, description, active, handleToggle }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          aria-expanded={active === index}
          aria-controls={`accordion-${index + 1}`}
          onClick={() => handleToggle(index)}
        >
          {title}
          <span>
            <strong>&#709;</strong>
          </span>
        </button>
      </h2>
      <div
        className={`accordion-panel ${active === index ? "block" : "hidden"}`}
        aria-labelledby={`accordion-${index + 1}`}
        aria-hidden={active !== index}
      >
        <p>{description?.trim() ? description : 'brak opisu'}</p>
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