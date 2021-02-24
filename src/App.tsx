import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.HeaderArea}>
        <Header />
      </div>
      <div className={styles.SidebarArea}>
        <Sidebar />
      </div>
      <div>
        <Content />
      </div>
    </div>
  );
}

export default App;
