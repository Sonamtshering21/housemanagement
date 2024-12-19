// app/admin/layout.js
"use client";
import React from "react";
import Sidebar from "../dashboard/components/Sidebar";
import styles from "./admin.module.css";
import Headeradmin from "./components/Headeradmin";


const AdminLayout = ({ children }) => {

  return (
    <div className={styles.container}>
      {" "}
      {/* Use the container class here */}
      <Sidebar />
      <Headeradmin />
      <div className={styles.innerdisplay}>{children}</div>
    </div>
  );
};

export default AdminLayout;
