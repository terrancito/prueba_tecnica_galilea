import React, { useEffect, useState } from "react";

const NumberInput = ({
  step,
  value,
  min,
  max,
  precision,
  editable,
  softmin,
  softmax
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });

  console.log(formatter.format(2.005)); // "2.01"
  console.log(formatter.format(1.345)); // "1.35"
  const [count, setCount] = useState(value);
  const disableAdd = count >= max;
  const disableSub = count <= min;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [softblocked, setSoftblocked] = useState(false);
  const inputStyle = softblocked ? { backgroundColor: "red" } : {};

  const useDebounce = (value, delay) => {
    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
    return formatter.format(debouncedValue);
  };

  const debouncedNumber = useDebounce(count, 800);

  function increment() {
    const newCount = Math.min(count + step, max);
    setCount(newCount);
    handleInput({ target: { value: newCount } });
  }

  function decrement() {
    const newCount = Math.max(count - step, min);
    setCount(newCount);
    handleInput({ target: { value: newCount } });
  }

  const handleInput = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue > max) {
      setSoftblocked(true);
      setCount(max);
    } else if (inputValue < min) {
      setSoftblocked(true);
      setCount(min);
    } else if (softmin > inputValue || softmax < inputValue) {
      setSoftblocked(true);
      setCount(inputValue);
    } else if (softmin < inputValue || softmax > inputValue) {
      setSoftblocked(false);
      setCount(inputValue);
    } else {
      setCount(inputValue);
    }
  };

  return (
    <div>
      <div>
        <h1>{debouncedNumber}</h1>
        <button
          className={"increment"}
          onClick={increment}
          disabled={disableAdd || !editable}
        >
          +
        </button>
        <input
          disabled={!editable}
          type="number"
          step={step}
          style={inputStyle}
          onChange={handleInput}
          value={count}
          defaultValue={0}
        />
        <button
          className="decrement"
          onClick={decrement}
          disabled={disableSub || !editable}
        >
          -
        </button>
      </div>
    </div>
  );
};

NumberInput.defaultProps = {
  step: 10,
  value: 0,
  softmin: -50,
  softmax: 50,
  min: -65,
  max: 65,
  precision: 2,
  editable: true
};

export default NumberInput;
