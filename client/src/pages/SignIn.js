import React, { useState } from 'react';
import Mantashlogo from "../assets/graylogo.svg"
import graylogo from "../assets/gray.svg"
import usericon from "../assets/inputu.svg"
import inputBackground from "../assets/inputu.svg"
import inputp from "../assets/inputp.svg"
import { Navigate, useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const userData = { username, password };
    
    navigate("/dashboard/198");
    // Example API call
    // fetch('https://your-backend-api.com/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response data
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
      setUsername('');
      setPassword('');
  };

  return (
   
    <div className=" h-screen  w-full -mb-6  -mt-0 bg-gainsboro  overflow-x-hidden flex flex-row items-start justify-center pt-[40px]  pb-[123px]  leading-[normal] tracking-[normal] text-left text-[36px] text-black font-poppins">
      <section className="w-[970px] rounded-31xl bg-whitesmoke flex flex-row items-start justify-start mt-6 pt-[123.9px] px-px pb-12 box-border relative gap-[14.9px] max-w-full text-left text-xl text-black font-poppins mq700:pt-[81px] mq700:pb-[31px] mq700:box-border mq925:flex-wrap">
    <div className="h-[473px] w-[970px] relative rounded-31xl bg-whitesmoke hidden max-w-full z-[0]" />
        <div className=" w-[139.1px] absolute top-[111px] right-[413.9px] leading-[25px] font-medium inline-block z-[1] mq450:text-base mq450:leading-[20px]">
          <div className='flex flex-row justify-between items-center'>
          <span>Username</span> 
          <div className='w-28 mt-1 -mr-14 z-10 h-0.5 bg-black'></div>
          </div>
        </div>
        <div className="w-[131.3px] absolute top-[221px] left-[411px] leading-[27px] font-medium inline-block z-[1] mq450:text-base mq450:leading-[22px]">
        <div className='flex flex-row justify-between items-center'>
          <span>Password</span> 
          <div className='w-32 -mr-20 z-10 h-0.5 bg-black'></div>
          </div>
        </div>
        <div className="w-[357.1px] flex flex-col items-start justify-start pt-[31.1px] px-0 pb-0 box-border min-w-[357.1px] max-w-full mq450:min-w-full mq925:flex-1">
          <div className="self-stretch h-[125px] relative">
            <img
              className="absolute top-[0px] left-[0px] w-[357.1px] h-[100px] object-cover z-[1]"
              alt="Mantash AI Logo"
              src={Mantashlogo}
            />
            <img
              className="absolute top-[80px] left-[86px] w-[201px] h-[45px] object-cover z-[2]"
              loading="lazy"
              alt="Graymatics Logo"
              src = {graylogo}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="m-0 w-[567px] flex flex-col items-end justify-start gap-[33.9px] min-w-[567px] max-w-full mq700:gap-[17px] mq700:min-w-full mq925:flex-1">
          <div className="self-stretch h-[75.1px] relative">
            <img
              className="absolute top-[0px] left-[0px] w-full h-full z-[2]"
              alt="Username Input Background"
              src={inputBackground}
            />

            <img
              className="absolute top-[1.5px] left-[183.1px] w-[116.2px] h-[0.7px] object-contain z-[3]"
              alt="Username Icon"
              src={usericon}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="absolute top-[26.1px] left-[50px] text-xl font-semibold font-poppins text-black text-left inline-block w-[400px] h-[30px] z-[3] mq450:text-base bg-transparent border-none outline-none placeholder-gray"
              style={{ fontFamily: 'Poppins', fontWeight: 'medium', fontSize: '1rem' }}
            />
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[5.1px] gap-[14px]">
            <div className="self-stretch h-[75.1px] relative">
              <img
                className="absolute top-[0px] left-[0px] w-full h-full z-[2]"
                alt="Password Input Background"
                src={inputp}
              />
              <img
                className="absolute top-[1.7px] left-[169.3px] w-[111.7px] h-[0.6px] object-contain z-[3]"
                alt="Password Icon"
                src="/about.svg"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="absolute top-[26.1px] left-[50px] text-xl font-semibold font-poppins text-black text-left inline-block w-[400px] h-[30px] z-[3] mq450:text-base bg-transparent border-none outline-none placeholder-gray"
                style={{ fontFamily: 'Poppins', fontWeight: 'medium', fontSize: '1rem' }}
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-0 px-3">
              <a href="/forgot-password" className="relative text-[14px] font-medium font-poppins text-black text-left inline-block min-w-[106.2px] z-[1]">
                Forgot details?
              </a>
            </div>
          </div>
          <button type="submit" className="cursor-pointer border-none pt-2.5 pb-2 pr-[25px] pl-[35px] bg-black rounded-xl flex flex-row items-start justify-start z-[1] hover:bg-darkslategray">
            <div className="h-[43px] w-[120px] relative rounded-xl bg-black hidden" />
            <div className="relative text-base font-medium font-poppins text-white text-left inline-block min-w-[60px] z-[2]">
              SUBMIT
            </div>
          </button>
        </form>
      </section>
      <div className="w-[201px] mt-12 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border ml-[-171px]">
        <h2 className="m-0 self-stretch relative text-inherit  font-extrabold text-shadow-[1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000] z-[1] mq450:text-[22px] mq925:text-[29px] ">
          Sign in
        </h2>
      </div>
    </div>
  );
};

export default SignIn;
