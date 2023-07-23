import { useState } from 'react'
import './App.css'

function App() {
  const [calculatedDays, setCalculatedDays] = useState(0);
  const [calculatedMonths, setCalculatedMonths] = useState(0);
  const [calculatedYears, setCalculatedYears] = useState(0);

  const calculateAge = (dayInput, monthInput, yearInput) => {

    let bDay = dayInput;
    bDay = parseInt(bDay);

    let bMonth = monthInput;
    bMonth = parseInt(bMonth);

    let bYear = yearInput;
    bYear = parseInt(bYear);

    const todayFull = new Date();
    let tDay = todayFull.getDate();
    let tMonth = todayFull.getMonth() + 1; ///added + 1 bc getMonth uses a zero-based index so Jan starts at 0
    let tYear = todayFull.getFullYear();

    if (tDay < bDay) {
      if (bDay !== 0) {
        setCalculatedDays((tDay - bDay) + 30);
      }
      tMonth -= 1;
    } else {
      if (bDay !== 0) {
        setCalculatedDays(tDay - bDay);
      }
    }

    if (tMonth < bMonth) {
      if (bMonth !== 0) {
        setCalculatedMonths((tMonth - bMonth) + 12);
      }

      tYear -= 1;
    } else {
      if (bMonth !== 0) {
        setCalculatedMonths(tMonth - bMonth);
      }
    }

    if (bYear !== 0) {
      setCalculatedYears(tYear - bYear);
    }
  }

  const [isDayFieldEmpty, setIsDayFieldEmpty] = useState(false);
  const [isMonthFieldEmpty, setIsMonthFieldEmpty] = useState(false);
  const [isYearFieldEmpty, setIsYearFieldEmpty] = useState(false);
  const [isDayInputInvalid, setIsDayInputInvalid] = useState(false);
  const [isMonthInputInvalid, setIsMonthInputInvalid] = useState(false);
  const [isYearInputInvalid, setIsYearInputInvalid] = useState(false);
  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  let invalidDayError = (<span className='error-text'><i>Must be a valid day</i></span>);
  let invalidMonthError = (<span className='error-text'><i>Must be a valid month</i></span>);
  let invalidYearError = (<span className='error-text'><i>Must be in the past</i></span>);
  let invalidDateError = (<span className='error-text'><i>Must be a valid date</i></span>)
  let requiredFieldError = (<span className='error-text'><i>This field is required</i></span>)


  const validateForm = (event) => {

    event.preventDefault();

    let d = document.getElementById('dayInput').value;
    let m = document.getElementById('monthInput').value;
    let y = document.getElementById('yearInput').value;
    const thirtyDayMonths = [4, 6, 9, 11]
    const leapYears = [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020]; ////can we remake this using a loop?

    //validate day values
    if (d === "") {
      document.getElementById('dayInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('dayLabel').style.color = "hsl(0, 100%, 67%)";
      setIsDayFieldEmpty(true);
    } else if (d < 1 || d > 31) {
      document.getElementById('dayInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('dayLabel').style.color = "hsl(0, 100%, 67%)";
      setIsDayInputInvalid(true);
      setIsDayFieldEmpty(false);
    } else {
      document.getElementById('dayInput').style.outline = "1px solid hsl(0, 0%, 94%)";
      document.getElementById('dayLabel').style.color = "hsl(0, 1%, 44%)";
      setIsDayFieldEmpty(false);
      setIsDayInputInvalid(false);
    }


    //validate month value
    if (m === "") {
      document.getElementById('monthInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('monthLabel').style.color = "hsl(0, 100%, 67%)";
      setIsMonthFieldEmpty(true);
    } else if (m < 1 || m > 12) {
      document.getElementById('monthInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('monthLabel').style.color = "hsl(0, 100%, 67%)";
      setIsMonthInputInvalid(true);
      setIsMonthFieldEmpty(false);
    } else if (thirtyDayMonths.includes(parseInt(m)) && d === '31') { ////validate if month has 31 days
      document.getElementById('dayInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('dayLabel').style.color = "hsl(0, 100%, 67%)";
      setIsDateInvalid(true);
      setIsMonthFieldEmpty(false);
    } else if (leapYears.includes(parseInt(y)) && m === '2' && d > 29) { ////validate if month is february and year is a leap year
      document.getElementById('dayInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('dayLabel').style.color = "hsl(0, 100%, 67%)";
      setIsDateInvalid(true);
      setIsMonthFieldEmpty(false);
    } else if (!leapYears.includes(parseInt(y)) && m === '2' && d > 28) { ////validate if month is february and year is NOT a leap year
      document.getElementById('dayInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('dayLabel').style.color = "hsl(0, 100%, 67%)";
      setIsDateInvalid(true);
      setIsMonthFieldEmpty(false);
    } else {
      document.getElementById('monthInput').style.outline = "1px solid hsl(0, 0%, 94%)";
      document.getElementById('monthLabel').style.color = "hsl(0, 1%, 44%)";
      setIsMonthFieldEmpty(false);
      setIsDateInvalid(false);
    }

    //validate year value
    if (y === "") {
      document.getElementById('yearInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('yearLabel').style.color = "hsl(0, 100%, 67%)";
      setIsYearFieldEmpty(true);
    } else if (y > 2023) {
      document.getElementById('yearInput').style.outline = "1px solid hsl(0, 100%, 67%)";
      document.getElementById('yearLabel').style.color = "hsl(0, 100%, 67%)";
      setIsYearInputInvalid(true);
      setIsYearFieldEmpty(false);
    } else {
      document.getElementById('yearInput').style.outline = "1px solid hsl(0, 0%, 94%)";
      document.getElementById('yearLabel').style.color = "hsl(0, 1%, 44%)";
      setIsYearFieldEmpty(false);
    }

    // //if fields are not empty then call calculateAge
    let myPromise = new Promise(function (resolve, reject) {
      if ((!isDayFieldEmpty && !isMonthFieldEmpty && !isYearFieldEmpty) || (isYearInputInvalid && isMonthInputInvalid && isDayInputInvalid)) {
        resolve();
      } else {
        reject();
      }
    });

    myPromise.
      then(function () {
        calculateAge(parseInt(d), parseInt(m), parseInt(y));
      })

  }

  return (
    <>
      <div className='container'>
        <div className='card'>
          <div className='card-body'>

            <InputComponent isDayFieldEmpty={isDayFieldEmpty} isMonthFieldEmpty={isMonthFieldEmpty} isYearFieldEmpty={isYearFieldEmpty} 
              requiredFieldError={requiredFieldError} isDayInputInvalid={isDayInputInvalid} isMonthInputInvalid={isMonthInputInvalid} isYearInputInvalid={isYearInputInvalid}
              invalidDayError={invalidDayError} invalidMonthError={invalidMonthError} invalidYearError={invalidYearError} isDateInvalid={isDateInvalid} invalidDateError={invalidDateError}
            />

            <DividerComponent validateForm={validateForm} />

            <ResultsComponent calculatedYears={calculatedYears} calculatedMonths={calculatedMonths} calculatedDays={calculatedDays} />

          </div>
        </div>
      </div>
    </>
  )
}

function InputComponent({ isDayFieldEmpty, isMonthFieldEmpty, isYearFieldEmpty, requiredFieldError,  isDayInputInvalid, isMonthInputInvalid, isYearInputInvalid, invalidDayError, invalidMonthError, invalidYearError, isDateInvalid, invalidDateError}) {
  return (
    <>
      <form className='form' id="form" name="calculteAgeForm" action="" method="" autoComplete='off'>
        <div className='input-row' id="row">
          <div className='col col-left'>
            <div>
              <label htmlFor='day' id="dayLabel">day</label><br />
              <input type='number' id="dayInput" placeholder='DD' />
            </div>
            <div>
              {isDayFieldEmpty ? requiredFieldError : isDayInputInvalid ? invalidDayError : isDateInvalid ? invalidDateError : (<></>)}
            </div>
          </div>
          <div className='col col-mid'>
            <div>
              <label htmlFor='month' id="monthLabel">month</label><br />
              <input type='number' id="monthInput" placeholder='MM' />
            </div>
            <div>
              {isMonthFieldEmpty ? requiredFieldError : isMonthInputInvalid ? invalidMonthError : (<></>)}
            </div>
          </div>
          <div className='col col-right'>
            <div>
              <label htmlFor='year' id="yearLabel">year</label><br />
              <input type='number' id="yearInput" placeholder='YYYY' />
            </div>
            <div>
              {isYearFieldEmpty ? requiredFieldError : isYearInputInvalid ? invalidYearError : (<></>)}
            </div>
          </div>

        </div>
      </form>
    </>
  )
}

function DividerComponent({ validateForm }) {
  return (
    <>
      <div className='divider' id="row">
        <hr className='hr'></hr>
        <button type='button' onClick={(e) => { validateForm(e); }}></button>
      </div>
    </>
  )
}

function ResultsComponent({ calculatedYears, calculatedMonths, calculatedDays }) {
  return (
    <>
      <div className='result'>
        <p className='result-text'>
          <i>
            {(calculatedYears && calculatedDays && calculatedMonths) ? (
              <span className='result-num'>{calculatedYears} </span>
            ) : (
              <span className='result-num'>- - </span>
            )
            }
            years
          </i> <br />
          <i>
            {(calculatedYears && calculatedDays && calculatedMonths) ? (
              <span className='result-num'>{calculatedMonths} </span>
            ) : (
              <span className='result-num'>- - </span>
            )
            }
            months
          </i> <br />
          <i>
            {(calculatedYears && calculatedDays && calculatedMonths) ? (
              <span className='result-num'>{calculatedDays} </span>
            ) : (
              <span className='result-num'>- - </span>
            )
            }
            days
          </i> <br />
        </p>
      </div>
    </>
  )
}

export default App
