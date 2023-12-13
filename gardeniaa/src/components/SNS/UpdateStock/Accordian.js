import React, { useState } from "react";

const Accordian = ({ brand, category, family, variant }) => {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  return (
    <>
      {" "}
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
            {!isActive}+{brand}
          </div>
        </div>
        {isActive && (
          <div className="accordion-content">
            {" "}
            <div className="accordion-item">
              <div
                className="accordion-title"
                onClick={() => setIsActive1(!isActive1)}
              >
                {" "}
                <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                  {isActive1 ? "-  " : "+  "}
                  {category}
                </div>
              </div>
              {isActive1 && (
                <div className="accordion-content">
                  {" "}
                  <div className="accordion-item">
                    <div
                      className="accordion-title"
                      onClick={() => setIsActive2(!isActive2)}
                    >
                      <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
                        {isActive2 ? "-" : "+"}
                        {family}
                      </div>
                    </div>
                    {isActive2 && (
                      <div
                        className="accordion-content"
                        style={{ marginLeft: "4rem", marginTop: "1rem" }}
                      >
                        {variant} <input type="number" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Accordian;
