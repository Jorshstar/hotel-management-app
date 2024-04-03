import Image from "next/image"

import React from 'react';

// Define the keyframe animations separately
const blinkKeyframes = `
  @keyframes blink-color {
    0% { color: #260954ea; }
    25% { color: #ff7f00; }
    50% { color: #ffffff; }
    75% {color: #ff7f00}
    100%{color: #ffffff; }
  }
`;

const fadeInOutKeyframes = `
  @keyframes fade-in-out {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }

  }
`;

export const heading1 = (
  <>
    <style>{blinkKeyframes}</style>
    <style>{fadeInOutKeyframes}</style>
    <div className="relative overflow-hidden h-[400px] bg-gradient-to-r from-gray-900 to-gray-800 w-full px-4 md:px-0 flex flex-col justify-center items-center text-center">
      
    <div className="absolute inset-0 z-0">
      <Image
          src="/images/hotelmain3.jpg"
          alt="background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 text-white" style={{ animation: 'blink-color 3s infinite alternate' }}>
        <h1 className="font-heading text-5xl md:text-5xl mb-6 leading-tight">Streamlined Hotel Management for Effortless Stay</h1>
        <p className="text-white items-center justify-center text-lg md:text-xl mb-12 max-w-lg" >
          Simplify Your Stay: Easy Hotel Management for a Relaxing Experience
        </p>
        <button className="bg-tertiary-dark hover:bg-tertiary-light text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Get Started</button>
      </div>
    </div>
  </>
);


export const section2 = (
  <div className='md:grid hidden gap-8 grid-cols-1'>
    <div className='rounded-2xl overflow-hidden h-48'>
      <Image
        src='/images/hotelmain1.jpg'
        alt='hero-1'
        width={300}
        height={300}
        className='img scale-animation'
      />
    </div>

    <div className='grid grid-cols-2 gap-8 h-48'>
      <div className='rounded-2xl overflow-hidden'>
        <Image
          src='/images/hotelmain2.jpg'
          alt='hero-2'
          width={300}
          height={300}
          className='img scale-animation'
        />
      </div>
      <div className='rounded-2xl overflow-hidden'>
        <Image
          src='/images/hotelmain5.jpg'
          alt='hero-3'
          width={300}
          height={300}
          className='img scale-animation'
        />
      </div>
    </div>
  </div>
)