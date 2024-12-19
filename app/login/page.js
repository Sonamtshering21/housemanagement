import React from 'react'
import Login from '../../components/LoginForm.jsx'
import styles from './login.module.css'
const page = () => {
  return (
    <div className={styles.loginbg}>
    <Login/>
    </div>
  )
}

export default page