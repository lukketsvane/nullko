import React from 'react';
import QRCode from 'qrcode.react';

type QrCodeProps = {
  value: string;
};

const QrCode: React.FC<QrCodeProps> = ({ value }) => {
  return (
    <div className="flex justify-center mt-4">
      <QRCode value={value} />
    </div>
  );
};

export default QrCode;
