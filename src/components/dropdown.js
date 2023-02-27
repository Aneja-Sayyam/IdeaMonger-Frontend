import React, { useState,useRef,useEffect } from "react";
import styles from "./dropdown.module.css";

const DropDown = (props) => {
    const { dropdownValue, options, handleSelectedOption } = props;
    const node = useRef();
    const [dropdown, setDropdown] = useState(false);
    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, []);
    const handleClick = e => {
        if (!node.current.contains(e.target)) {
            setDropdown(false);
            return;
        }
    };
  const showDropdown = () => {
    if (dropdown === true) {
        return (
          <div className={styles.dropdownContent}>
            {showOptions()}
          </div>
        );
    }
  };
    const showOptions = () => {
        return options.map((option) => {
            return (
                <span key={option.value} onClick={() => {
                    handleSelectedOption(option.value);
                    setDropdown(false);
                }} className={styles.dropOption}>{option.label}</span>
            );
        })
    };
  return (
    <div ref={node} className={styles.dropdown}>
      <div
        onClick={() => {
          setDropdown(!dropdown);
        }}
        className={styles.dropbtn}
      >
        {dropdownValue}
      </div>
      {showDropdown()}
    </div>
  );
};

export default DropDown;
