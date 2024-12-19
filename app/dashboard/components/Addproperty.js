'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import styles from '../components/styles/addproperty.module.css'
import Houseforrent from '../components/addpropertycomponents/Houseforrent'
import Hotel from '../components/addpropertycomponents/Hotel'
import Homestay from '../components/addpropertycomponents/Homestay'
const Addproperty = () => {
    const { data:session }= useSession();
    const userId=session?.user?.id;
    const [selectedOption, setSelectedOption]=useState('House for Rent');
    const handleOptionChange=(e)=>{
        setSelectedOption(e.target.value);
    }
  return (
    <div className={styles.addproperty}>
        <h1>List Your Property</h1>
        <p>Select the Type of Property</p>
        <div className={styles.options}>
            <label>
                <input 
                type="radio" 
                name="propertyType" 
                value="House for Rent" 
                checked={selectedOption === 'House for Rent'}
                onChange={handleOptionChange} />
                House for Rent
            </label>
            <label>
                <input 
                type="radio" 
                name="propertyType" 
                value="Hotel" 
                checked={selectedOption === 'Hotel'}
                onChange={handleOptionChange}/>
                Hotel
            </label>
            <label>
                <input 
                type="radio" 
                name="propertyType" 
                value="Home Stay" 
                checked={selectedOption === 'Home Stay'}
                onChange={handleOptionChange}/>
                Home Stay
            </label>
        </div>
        <div className={styles.content}>
        {selectedOption === "House for Rent" && <Houseforrent/>}
        {selectedOption === "Hotel" && <Hotel/>}
        {selectedOption === "Home Stay" && <Homestay/>}
      </div>

    </div>
    
  )
}

export default Addproperty