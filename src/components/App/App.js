import React from 'react';
import styles from './App.component.scss';
import SearchPage from "pages/SearchPage/HotelSearchPage";

function App() {
  return (
    <div className={styles.app}>
      <SearchPage />
    </div>
  );
}

export default App;
