// src/pages/QRCodePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QRCodePage.css';

const QRCodePage = () => {
  const { orderId } = useParams();
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Simulate order details
    setOrderDetails({
      id: orderId,
      clubName: 'Neon Lounge',
      total: 45.99,
      items: [
        { name: 'Signature Mojito', quantity: 2, price: 12 },
        { name: 'Chicken Wings', quantity: 1, price: 16 }
      ],
      estimatedReady: '10-15 minutes'
    });

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Simple QR code simulation using CSS
  const SimpleQRCode = () => (
    <div className="simple-qr-code">
      <div className="qr-grid">
        {Array.from({ length: 25 }, (_, index) => (
          <div 
            key={index} 
            className={`qr-cell ${Math.random() > 0.4 ? 'filled' : ''}`}
          />
        ))}
      </div>
      <div className="qr-text">ORDER #{orderId}</div>
    </div>
  );

  if (!orderDetails) {
    return (
      <div className="qr-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Generating your QR code...</p>
      </div>
    );
  }

  return (
    <div className="qr-code-page">
      <div className="container">
        <div className="qr-header text-center">
          <h1>Your Order is Confirmed!</h1>
          <p>Show this QR code at {orderDetails.clubName} to collect your order</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="qr-card">
              <div className="qr-timer">
                <div className="timer-circle">
                  <div className="timer-content">
                    <span className="time-left">{formatTime(timeLeft)}</span>
                    <small>Time Remaining</small>
                  </div>
                  <svg className="timer-svg" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--light-gray)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * timeLeft) / (15 * 60)}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>

              <div className="qr-code-container">
                <div className="qr-code-wrapper">
                  <SimpleQRCode />
                </div>
                <div className="qr-overlay">
                  <div className="qr-order-id">Order #{orderId}</div>
                </div>
              </div>

              <div className="qr-instructions">
                <div className="instruction-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Go to the pickup counter</strong>
                    <p>Head to the designated pickup area at {orderDetails.clubName}</p>
                  </div>
                </div>
                <div className="instruction-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Show your QR code</strong>
                    <p>Staff will scan this code to verify your order</p>
                  </div>
                </div>
                <div className="instruction-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Collect your order</strong>
                    <p>Receive your items instantly, no waiting required</p>
                  </div>
                </div>
              </div>

              <div className="order-details">
                <h5>Order Summary</h5>
                <div className="order-items">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <strong>Total: ${orderDetails.total.toFixed(2)}</strong>
                </div>
                <div className="estimated-time">
                  <i className="fas fa-clock me-2"></i>
                  Estimated ready in: {orderDetails.estimatedReady}
                </div>
              </div>

              <div className="qr-actions">
                <button className="btn btn-outline-primary me-2">
                  <i className="fas fa-download me-2"></i>
                  Save QR
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fas fa-share-alt me-2"></i>
                  Share
                </button>
              </div>
            </div>

            <div className="support-info">
              <div className="support-card">
                <i className="fas fa-headset"></i>
                <div>
                  <strong>Need help?</strong>
                  <p>Contact club staff or our support team</p>
                </div>
                <button className="btn btn-primary btn-sm">
                  Get Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;

// // src/pages/QRCodePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { QRCode } from 'qrcode.react'; // FIXED: Use named import
// import './QRCodePage.css';

// const QRCodePage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     // Simulate order details
//     setOrderDetails({
//       id: orderId,
//       clubName: 'Neon Lounge',
//       total: 45.99,
//       items: [
//         { name: 'Signature Mojito', quantity: 2, price: 12 },
//         { name: 'Chicken Wings', quantity: 1, price: 16 }
//       ],
//       estimatedReady: '10-15 minutes'
//     });

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [orderId]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   if (!orderDetails) {
//     return (
//       <div className="qr-loading">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p>Generating your QR code...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="qr-code-page">
//       <div className="container">
//         <div className="qr-header text-center">
//           <h1>Your Order is Confirmed!</h1>
//           <p>Show this QR code at {orderDetails.clubName} to collect your order</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-6 col-md-8">
//             <div className="qr-card" data-aos="zoom-in">
//               <div className="qr-timer">
//                 <div className="timer-circle">
//                   <div className="timer-content">
//                     <span className="time-left">{formatTime(timeLeft)}</span>
//                     <small>Time Remaining</small>
//                   </div>
//                   <svg className="timer-svg" viewBox="0 0 100 100">
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="45"
//                       fill="none"
//                       stroke="var(--light-gray)"
//                       strokeWidth="8"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="45"
//                       fill="none"
//                       stroke="var(--primary)"
//                       strokeWidth="8"
//                       strokeLinecap="round"
//                       strokeDasharray="283"
//                       strokeDashoffset={283 - (283 * timeLeft) / (15 * 60)}
//                       transform="rotate(-90 50 50)"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <div className="qr-code-container">
//                 <div className="qr-code-wrapper">
//                   <QRCode
//                     value={`CLUBSYNC-${orderId}-${Date.now()}`}
//                     size={200}
//                     level="H"
//                     includeMargin
//                     className="qr-code"
//                   />
//                 </div>
//                 <div className="qr-overlay">
//                   <div className="qr-order-id">Order #{orderId}</div>
//                 </div>
//               </div>

//               {/* Rest of your component remains the same */}
//               <div className="qr-instructions">
//                 <div className="instruction-step">
//                   <div className="step-number">1</div>
//                   <div className="step-content">
//                     <strong>Go to the pickup counter</strong>
//                     <p>Head to the designated pickup area at {orderDetails.clubName}</p>
//                   </div>
//                 </div>
//                 <div className="instruction-step">
//                   <div className="step-number">2</div>
//                   <div className="step-content">
//                     <strong>Show your QR code</strong>
//                     <p>Staff will scan this code to verify your order</p>
//                   </div>
//                 </div>
//                 <div className="instruction-step">
//                   <div className="step-number">3</div>
//                   <div className="step-content">
//                     <strong>Collect your order</strong>
//                     <p>Receive your items instantly, no waiting required</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="order-details">
//                 <h5>Order Summary</h5>
//                 <div className="order-items">
//                   {orderDetails.items.map((item, index) => (
//                     <div key={index} className="order-item">
//                       <span className="item-name">
//                         {item.name} × {item.quantity}
//                       </span>
//                       <span className="item-price">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="order-total">
//                   <strong>Total: ${orderDetails.total.toFixed(2)}</strong>
//                 </div>
//                 <div className="estimated-time">
//                   <i className="fas fa-clock me-2"></i>
//                   Estimated ready in: {orderDetails.estimatedReady}
//                 </div>
//               </div>

//               <div className="qr-actions">
//                 <button className="btn btn-outline-primary me-2">
//                   <i className="fas fa-download me-2"></i>
//                   Save QR
//                 </button>
//                 <button className="btn btn-outline-primary">
//                   <i className="fas fa-share-alt me-2"></i>
//                   Share
//                 </button>
//               </div>
//             </div>

//             <div className="support-info">
//               <div className="support-card">
//                 <i className="fas fa-headset"></i>
//                 <div>
//                   <strong>Need help?</strong>
//                   <p>Contact club staff or our support team</p>
//                 </div>
//                 <button className="btn btn-primary btn-sm">
//                   Get Help
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QRCodePage;