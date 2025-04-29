import { useState } from "react";

import ArrowBlackRight from "@/src/assets/icons/arrowBlackRight.svg";

const DropDownListItem = ({ selectOption, getOptionValue, option }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="b-custom-select__dropdown__item">
      <div className="b-custom-select__dropdown__item__label">
        <div onClick={() => selectOption(getOptionValue(option))}>{option.label}</div>
        <button onClick={() => setVisible(!visible)}>
          <ArrowBlackRight
            style={{
              transform: visible ? "rotate(270deg)" : "rotate(90deg)",
              transition: "0.2s",
              width: "100%",
            }}
          />
        </button>
      </div>
      {visible &&
        option?.children?.map((child, index) => (
          <div
            className="b-custom-select__dropdown__item__subitem"
            key={index}
            onClick={() => selectOption(getOptionValue(child))}
          >
            {child.label}
          </div>
        ))}
    </div>
  );
};

export default DropDownListItem;
