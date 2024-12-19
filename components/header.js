import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../components/styles/styles.module.css'

const header = () => {
  return (
    <>
    <div className={styles.headersection}>
        <div className={styles.logocontainer}>
            <Image src='/logo.jpg' alt='img' width={70} height={70}/>House Rent Management system
        </div>
    <div className={styles.headerpage}>
      <ul>
      
         
        <li>
          <Link href='/tenants'>Kuzu Zangpola sign in</Link></li> 
          <li><Link href='/'>Booking Status</Link></li>
        <li>
          <Link href='/login'>List Your Property</Link>
        </li> 
          
       
      </ul>
    </div>
    </div>


    </>
  )
}

export default header
