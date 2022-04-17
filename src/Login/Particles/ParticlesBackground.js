import React from 'react'
import Particles from "react-tsparticles";
import ParticlesConfig from './particle-config'
import particle from './particle-config.js'



export default function ParticleBackground ({children}) {
  
var particlesInit = (main) => {
  console.log(main);
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};
var particlesLoaded = (container) => {
  console.log(container);
};

  return (
    <div className='posRelative'>
        <Particles 
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particle}
        // params = {ParticlesConfig}
        />
        {children}
    </div>
  )
}