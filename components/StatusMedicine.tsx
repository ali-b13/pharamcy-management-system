import React from 'react';



// Status component
const StatusMedicine = ({ days }:any) => {

  let statusMessage = '';
  let statusColor = '';

  if (days > 90) { // More than 3 months
    statusMessage = 'ممتاز';
    statusColor = 'green';
  } else if (days > 30 && days <= 90) { // Less than 3 months but more than 1 month
    statusMessage = 'تحذير: في فتره الانتهاء';
    statusColor = 'orange';
  } else if (days > 0 && days <= 30) { // Less than or equal to 1 month
    statusMessage = ' تحذير: سينتهي قريباّ';
    statusColor = 'red';
  } else if (days === 0) { // Expiring today
    statusMessage = 'منتهي !';
    statusColor = 'darkred';
  } else { // Already expired
    statusMessage = 'منتهي!';
    statusColor = 'darkred';
  }

  const statusStyle = {
    color: statusColor,
    fontWeight: 'bold',
  };

  return (
    <span style={statusStyle}>
      {statusMessage}
    </span>
  );
};

export default StatusMedicine
