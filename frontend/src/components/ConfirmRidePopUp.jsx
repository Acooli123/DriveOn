import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        // handle OTP submit here
        console.log("OTP Submitted");
    };
    return (
        <div className='h-screen '>
        <h5
            className="text-center top-0 text-gray-300"
            onClick={() => {
                props.setRidePopUpPanel(false)
                props.setConfirmRidePopUpPanel(false)
            }}
        >
            <i className="text-3xl ri-arrow-down-wide-fill"></i>
        </h5>
        <h3 className="text-2xl font-bold mb-5">Confirm Your Ride to Start</h3>

        <div className='flex items-center justify-between bg-yellow-500 p-3 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/736x/58/d1/85/58d185848a44f78558c2df1d82ea91f0.jpg" alt="user" />
                <h2 className='text-xl font-medium'>Sayan Paul</h2>
            </div>
            <h5 className='text-xl font-semibold'>2.2 km</h5>
        </div>

        <div className='flex flex-col justify-between items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-2 border-b-2'>
                    <i className="text-xl font-semibold ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>583, Anada Negi Lane Road</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Baghbazar, Kolkata, West Bengal 700003</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-2 border-b-2'>
                    <i className="text-xl ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Hare School</h3>
                        <p className='text-sm -mt-1 text-gray-600'>87, College St, Calcutta University, College Square, Kolkata, West Bengal 700073</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-2'>
                    <i className="text-xl font-semibold ri-hand-coin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹145.40</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash, UPI</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full ">
                <form onSubmit={(e)=> {
                    submitHandler(e)
                }}>
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter Otp' className="bg-[#eee] px-4 w-40 py-4 font-mono text-lg rounded-lg block mx-auto text-center"/>
                    <Link to="/captain-ride" className='w-full flex justify-center p-2 mt-7 bg-green-400 rounded-lg text-xl text-white font-semibold'>Confirm</Link>
                    <button onClick={()=>{
                        props.setRidePopUpPanel(false)
                        props.setConfirmRidePopUpPanel(false)
                    }} className='w-full p-2 mt-2 bg-red-500 text-white-700 rounded-lg text-xl text-white font-semibold'>Cancel</button>
                </form>
            </div>
        </div>
        
        </div>
    )
}

export default ConfirmRidePopUp
