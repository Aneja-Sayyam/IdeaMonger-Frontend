import React, { Component } from 'react';
import styles from "./profile.module.css";

class Activity extends Component {
    state = {  }
    render() { 
        return (
          <div className={styles.cards}>
            <span className={styles.title}>Activity</span>
          </div>
        );
    }
}
 
export default Activity;
