import React from 'react'

export default function DripDivider({ flip = false }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className="w-full h-[42px] block"
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      <path
        d="M0,0 L1200,0 L1200,20 
           C1150,20 1140,55 1100,55 
           C1060,55 1055,25 1015,25 
           C975,25 970,50 930,50 
           C890,50 885,15 845,15 
           C805,15 800,45 760,45 
           C720,45 715,22 675,22 
           C635,22 630,58 590,58 
           C550,58 545,18 505,18 
           C465,18 460,48 420,48 
           C380,48 375,25 335,25 
           C295,25 290,52 250,52 
           C210,52 205,20 165,20 
           C125,20 120,40 80,40 
           C40,40 20,15 0,20 Z"
        fill="#1A0E08"
      />
    </svg>
  )
}
