import RenderDays from "./RenderDays";
import { useState } from "react";

function ButtonLeftAndRight() {
  const [year, setYear] = useState(new Date().getFullYear());

  const handleIncrement = () => {
    setYear(year + 1);
  };

  const handleDecrement = () => {
    setYear(year - 1);
  };

  return (
    <div className="justify-center-align-center">
    <div className='flex-column'>
      <div className='justify-center-align-center mb-5px'>
        {["<",year, ">"].map((el, index) =>
          el === year ? (
            <div
              className='justify-center-align-center stats__ButtonLeftAndRight__year'
              key={index}
            >
              {el}
            </div>
          ) : (
            <div
              className='justify-center-align-center stats__ButtonLeftAndRight__signs'
              key={index}
              onClick={el === "<" ? handleDecrement : handleIncrement}
            >
              {el}
            </div>
          )
        )}
      </div>
      <RenderDays year={year}/>
    </div>
    </div>
  );
}

export default ButtonLeftAndRight;
