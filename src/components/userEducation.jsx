import React, { Component } from 'react';
import styles from "./profile.module.css";
import { Panel } from "rsuite";

class Education extends Component {
    state = {  }
    render() { 
      return (
        <Panel
          shaded
          collapsible
          defaultExpanded
          bodyFill
          style={{ backgroundColor: "white", margin: "20px 0" }}
          header={<span className={styles.title}>Education</span>}
        >
          <div className={styles.cards}>
            <div className={styles.subContext}>
              {this.props.currentQualification}
            </div>
            <div className={styles.subContext}>{this.props.college}</div>
            <div className={styles.subContext}>{this.props.highSchool}</div>
          </div>
        </Panel>
      );
    }
}
 
export default Education;