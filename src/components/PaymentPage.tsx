'use client';

import React, { useState } from 'react';
import { Doctor } from '@/data/doctors';
import QRCode from 'react-qr-code';
import { Language, translations } from '@/translations';

interface Props {
  doctor: Doctor;
  onPaymentComplete: (paymentId: string) => void;
  onBack: () => void;
  language: Language;
}

type PaymentMethod = 'card' | 'qr';

export default function PaymentPage({ doctor, onPaymentComplete, onBack, language }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const t = translations[language];

  // Generate a unique payment ID
  const paymentId = `PAY-${Math.random().toString(36).substr(2, 9)}`;
  
  // QR code payment data
  const qrData = JSON.stringify({
    paymentId,
    amount: doctor.consultationFee,
    doctorName: doctor.name,
    department: doctor.department
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
    }
    // Format expiry date
    else if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substr(0, 5);
    }
    // Limit CVV to 3 digits
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 3);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(paymentId);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.back}
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">{t.paymentDetails}</h2>
        
        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">{t.appointmentSummary}</h3>
          <p className="text-gray-600">{t.doctor}: {doctor.name}</p>
          <p className="text-gray-600">{t.department}: {doctor.department}</p>
          <p className="text-gray-600">{t.specialization}: {doctor.specialization}</p>
          <p className="font-medium text-lg mt-2">{t.amount}: ₹{doctor.consultationFee}</p>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">{t.selectPaymentMethod}</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setPaymentMethod('qr')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'qr'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <span className="block text-center font-medium">{t.qrCodePayment}</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <span className="block text-center font-medium">{t.cardPayment}</span>
            </button>
          </div>
        </div>

        {paymentMethod === 'qr' ? (
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <QRCode value={qrData} size={200} />
            </div>
            <p className="text-gray-600 mb-4">{t.scanQRCode}</p>
            <p className="text-sm text-gray-500">{t.paymentId}: {paymentId}</p>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              disabled={isProcessing}
            >
              {isProcessing ? t.verifyingPayment : t.completedPayment}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.cardNumber}
              </label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded-md"
                required
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.expiryDate}
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.cvv}
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.cardholderName}
              </label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleCardInputChange}
                placeholder="John Doe"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              disabled={isProcessing}
            >
              {isProcessing ? t.processing : `${t.pay} ₹${doctor.consultationFee}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 