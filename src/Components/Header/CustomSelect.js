import { useState, useEffect, useRef } from "react";
import classes from "./CustomSelect.module.css";

const CustomSelect = (props) => {
  const options = props.options;
  const defaultOption = props.defaultOption;

  const node = useRef();
  const [open, isOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const selectOpenHandler = () => {
    isOpen(!open);
  };

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    isOpen(false);
    props.onOptionClicked(value);
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    isOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  let borderRadius = open ? "8px 8px 0 0" : "8px";

  return (
    <div style={{ display: "flex", alignItems: "center" }} ref={node}>
      <label>{props.label}</label>
      <div
        className={classes.dropDownContainer}
        style={{ width: props.width, borderRadius: borderRadius }}
      >
        <div onClick={selectOpenHandler} className={classes.dropDownHeader}>
          {selectedOption}
        </div>
        {open && (
          <ul className={classes.dropDownList}>
            {options.map((option) => (
              <li onClick={onOptionClicked(option)} key={Math.random()}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
