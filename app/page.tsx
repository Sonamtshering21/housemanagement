
'use client'
import Header from '@/components/header'
import Footer from '@/components/footer'
import React, { useState, useEffect, useRef } from 'react';


function useIntersection(ref, options) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref.current; // Capture the current value of ref
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [ref, options]);

  return isVisible;
}


function AnimatedNumber({ targetNumber, duration }) {
const [currentNumber, setCurrentNumber] = useState(0);
const [hasAnimated, setHasAnimated] = useState(false);
const ref = useRef(null);
const isVisible = useIntersection(ref, { threshold: 0.1 });

useEffect(() => {
  if (isVisible && !hasAnimated) {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Progress goes from 0 to 1
      const updatedNumber = Math.floor(progress * targetNumber);

      setCurrentNumber(updatedNumber);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true); // Mark animation as completed
      }
    };

    requestAnimationFrame(animate);
  }
}, [isVisible, targetNumber, duration, hasAnimated]);

return (
  <span ref={ref}>
    {hasAnimated ? targetNumber : currentNumber}
  </span>
);
}



const Homepage = () => {
  
  return (
    <div>
      <Header/>
      <div className='homepage'>
      Our innovative house management system is designed to make life easier for homeowners and residents alike. For homeowners, it provides a seamless way to manage property details, track maintenance, and monitor tenant activities. For residents, it simplifies everyday living by streamlining communication, offering easy access to services, and ensuring a comfortable and hassle-free experience. With user-friendly features, secure access, and efficient management tools, our platform bridges the gap between convenience and control, empowering you to focus on what matters most.

      </div>

      <div className='staff'>
        <p>
          <span className='number'>
            {/* Use the fetched total_staff number as the target for the animation */}
            <AnimatedNumber targetNumber={12} duration={1000} />
          </span>{" "}
          House Owner
        </p>
        <p>
          <span className='number'>
            <AnimatedNumber targetNumber={10} duration={1000} />
          </span>{" "}
          Tenants
        </p>
        <p>
          <span className='number'>
            <AnimatedNumber targetNumber={4} duration={1000} />
          </span>{" "}
          Country
        </p>
      </div>

      <Footer/>
    </div>
  )
}

export default Homepage;