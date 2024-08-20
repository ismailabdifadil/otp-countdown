import { useEffect, useState } from 'react';

function App() {
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const resendOTP = () => {
    if (seconds === 0 && minutes === 0) {
      setMinutes(1);
      setSeconds(30);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // When seconds greater than 0 decrease by 1
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0 && minutes > 0) {
        // When seconds are 0 and minutes are greater than 1
        // Reset seconds to 59 and decrease minutes by 1
        setSeconds(59);
        setMinutes(minutes - 1);
      } else if (seconds === 0 && minutes === 0) {
        // When seconds and minutes are both equal to 0 clear the interval
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#e0e0f9] to-[#dadaff] ">
        <div className="bg-white p-6 rounded-lg text-slate-700 flex flex-col gap-5">
          <h1 className="text-xl text-center font-semibold">Verify OTP</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            className="py-3 px-5 border-[1.5px] border-[#dee1ea] w-[300px] rounded-md focus:border-blue-950/50 outline-none"
            onChange={({ target }) => setOtp(target.value)}
          />
          <div className="flex justify-between">
            <p className="text-sm">
              Time Remaining:{' '}
              <span className="font-semibold">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
            <button
              disabled={seconds > 0 || minutes > 0}
              className={`${
                seconds > 0 || minutes > 0 ? 'text-blue-100' : ' text-red-400'
              } underline`}
              onClick={resendOTP}
            >
              Resend OTP
            </button>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#9076fc] to-[#6950ff] text-white p-2 rounded-md text-[15px] hover:text-[#6950ff] hover:to-[#e6effb] hover:from-[#e6effb] font-medium transition-all"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
