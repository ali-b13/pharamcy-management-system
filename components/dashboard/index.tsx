"use client"
import SalesComponent from './Sales'
import Statistics from './Satastics'

const Dashboard = () => {

  return (
    <div className="dashboard-container">
          <Statistics/>
          <SalesComponent  />
    </div>
  );
};

export default Dashboard;