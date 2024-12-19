import React from 'react'
import style from './tenantsportal.module.css'
const page = () => {
  return (
    <div className={style.tenants}>
        <h1>Welcome to Tenants Portal</h1>
        <input type='text' placeholder='Enter Your registered mail'/>
        <button>Search</button>
        <p>Track your Status click here</p>
        <input type='mail' placeholder='Enter your registered Mail'/>
    </div>
  )
}

export default page