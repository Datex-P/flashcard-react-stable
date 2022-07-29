import React, { useContext } from "react";
import { Context } from '../../../context/Context';

export default function HourlyBreakdown() {
  const { dataBase, setDataBase } = useContext(Context);

  function handleMonths(e) {
    let newDataBase = { ...dataBase };
    newDataBase.hourlyBreakdown = e.target.value;
    setDataBase(newDataBase);
  }

  return (
    <div className='align-center flex-column'>
      <div className='stats__hourlyBreakdown__hourly-breakdown'>
          Hourly Breakdown
      </div>
      <div className='stats__hourlyBreakdown__month-container justify-evenly'>
        {['1 month', '3 months', '12 months'].map((comp, index) => (
          <React.Fragment key={index}>
            <input
              className='stats__hourlyBreakdown__input'
              name='breakdownIntervals'
              type='radio'
              title = {`Change background color of main menu to ${comp}.`}
              value={comp}
              checked={dataBase?.hourlyBreakdown === comp} //how to combine checked and handleColor accurately?
              onChange={handleMonths}
            />
            <label className='m-4px pt-4px'>
              {comp}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
