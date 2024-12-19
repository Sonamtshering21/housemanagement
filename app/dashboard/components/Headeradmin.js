import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
const Headeradmin = () => {
  const {data: session}=useSession();
  const handleSignOut=async()=>{
    await signOut({callbackUrl:'/'})
  };
  return (
    <div className={styles.headeradmin}>
        <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>House Renting</li>
            <li>Hotels</li>
            <li>Homestays</li>            
            {session ? (
          <>
            <li>
              <Link href='/dashboard' className='hover:text-green-300'>Dashboard</Link>
            </li>
           
           
           
            <li>
              <span>{session.user.name}</span>
              <button
                onClick={handleSignOut}
                className="font-bold"
                style={{ marginLeft: "5px" }}
              >
                Sign out
              </button>
            </li>
          </>
        ) : ( 
          // If not logged in, show a link to log in
          <li>
            <Link href='/login' className='hover:text-green-300'></Link>
          </li>
        )}
        </ul>
    </div>
  )
}

export default Headeradmin