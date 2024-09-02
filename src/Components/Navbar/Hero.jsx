import React, { useState } from 'react';
import Img1 from '../../assets/Image/icon-arrow.svg';

const Hero = () => {
  const [day, setDay] = useState('--');
  const [month, setMonth] = useState('--');
  const [year, setYear] = useState('--');

  const [inputDay, setInputDay] = useState('');
  const [inputMonth, setInputMonth] = useState('');
  const [inputYear, setInputYear] = useState('');

  const validateDate = (day, month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate(); // Days in the given month
    return (
      year > 0 &&
      month >= 1 && month <= 12 &&
      day >= 1 && day <= daysInMonth
    );
  };

  const handleUpdate = () => {
    const currentDate = new Date();
    const birthDate = new Date(parseInt(inputYear), parseInt(inputMonth) - 1, parseInt(inputDay));

    if (!validateDate(parseInt(inputDay), parseInt(inputMonth), parseInt(inputYear))) {
      setDay('--');
      setMonth('--');
      setYear('--');
      return;
    }

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    // Adjust if the current day is less than the birth day
    if (ageDays < 0) {
      // Borrow days from the previous month
      ageMonths -= 1;
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      ageDays += previousMonth.getDate();
    }

    // Adjust if the current month is less than the birth month
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setDay(ageDays);
    setMonth(ageMonths);
    setYear(ageYears);
  };

  const handleClear = () => {
    setDay('--');
    setMonth('--');
    setYear('--');
    setInputDay('');
    setInputMonth('');
    setInputYear('');
  };

  return (
    <div className='container flex flex-col items-center justify-center h-[100vh]'>
      <div className='bg-white w-[100vw] lg:w-[33vw] p-3 h-[55vh] lg:h-[60vh] lg:p-8 rounded-br-full'>
        <div className='flex flex-col cursor-pointer gap-[20px]'>
          <div className='flex items-center gap-[101px] lg:gap-[100px] text-gray-500'>
            <h1 className='font-bold text-xs hover:text-blue-600 duration-500'>DAY</h1>
            <h1 className='font-bold text-xs hover:text-blue-600 duration-500'>MONTH</h1>
            <h1 className='font-bold text-xs hover:text-blue-600 duration-500'>YEAR</h1>
          </div>

          <div className='flex items-center gap-[50px]'>
            <div>
              <input
                type="text"
                value={inputDay}
                onChange={(e) => setInputDay(e.target.value)}
                className='w-[70px] lg:w-[70px] transition-all border border-gray-300 px-3 py-1 focus:outline-none overflow-hidden'
              />
            </div>
            <div>
              <input
                type="text"
                value={inputMonth}
                onChange={(e) => setInputMonth(e.target.value)}
                className='w-[70px] sm:w-[70px] transition-all border border-gray-300 px-3 py-1 focus:outline-none overflow-hidden'
              />
            </div>
            <div>
              <input
                type="text"
                value={inputYear}
                onChange={(e) => setInputYear(e.target.value)}
                className='w-[70px] sm:w-[70px] transition-all border border-gray-300 px-3 py-1 focus:outline-none overflow-hidden'
              />
            </div>
          </div>

          <div className='flex items-center pl-[0px] lg:pl-[0px]'>
            <div>
              <hr className='w-[319px]' />
            </div>
            <div className='flex gap-2'>
              <img
                src={Img1}
                alt="Update"
                onClick={handleUpdate}
                className='h-[5vh] bg-red-400 hover:bg-blue-800 duration-700 rounded-full p-1 cursor-pointer'
              />
              
            </div>
          </div>

          <div className='flex flex-col text-start'>
            <h1 className='font-extrabold font-serif text-5xl'><span className='text-orange-700'>{year}</span> Years</h1>
            <h1 className='font-extrabold font-serif text-5xl'><span className='text-orange-700'>{month}</span> Months</h1>
            <h1 className='font-extrabold font-serif text-5xl'><span className='text-orange-700'>{day}</span> Days</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
