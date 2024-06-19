import React from 'react';

type QueueStatusProps = {
  storeId: string;
};

const QueueStatus: React.FC<QueueStatusProps> = ({ storeId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Kø Status</h2>
      <p className="text-gray-700">Status for butikken med ID: {storeId}</p>
    </div>
  );
};

export default QueueStatus;
