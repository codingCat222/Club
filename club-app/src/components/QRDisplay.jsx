import React, { useState, useRef } from 'react'
import './QRDisplay.css'

const QRDisplay = ({ orderId, orderDetails, onDownload, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const qrRef = useRef(null)

  const qrData = {
    orderId: orderId || 'CLB-789234',
    club: orderDetails?.club || 'Sky Lounge',
    items: orderDetails?.items || [],
    total: orderDetails?.total || 0,
    timestamp: orderDetails?.timestamp || new Date().toISOString()
  }

  const generateQRText = () => {
    return JSON.stringify({
      type: 'clubsync_order',
      version: '1.0',
      orderId: qrData.orderId,
      timestamp: qrData.timestamp
    })
  }

  const handleDownload = () => {
    if (onDownload) {
      onDownload(qrData)
    } else {
      // Default download behavior
      const qrText = generateQRText()
      const blob = new Blob([qrText], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `clubsync-qr-${qrData.orderId}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleShare = async () => {
    if (onShare) {
      onShare(qrData)
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: `ClubSync Order - ${qrData.orderId}`,
          text: `Show this QR code at ${qrData.club} to pick up your order.`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled:', error)
      }
    } else {
      // Fallback: copy to clipboard
      const qrText = generateQRText()
      navigator.clipboard.writeText(qrText)
      alert('QR data copied to clipboard!')
    }
  }

  return (
    <div className="qr-display-container">
      <div className="qr-header">
        <h4>
          <i className="fa fa-qrcode me-2"></i>
          Order QR Code
        </h4>
        <div className="qr-actions">
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className={`fa fa-${isExpanded ? 'compress' : 'expand'} me-1`}></i>
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      <div className={`qr-content ${isExpanded ? 'expanded' : ''}`}>
        {/* QR Code Visualization */}
        <div className="qr-visualization" ref={qrRef}>
          <div className="qr-grid">
            {Array.from({ length: 25 }).map((_, row) => (
              <div key={row} className="qr-row">
                {Array.from({ length: 25 }).map((_, col) => {
                  // Simple pattern generation based on orderId
                  const shouldFill = (row * col + orderId?.charCodeAt(col % orderId.length)) % 3 === 0
                  return (
                    <div 
                      key={col} 
                      className={`qr-pixel ${shouldFill ? 'filled' : ''}`}
                    ></div>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="qr-overlay">
            <div className="qr-logo">
              <i className="fa fa-glass"></i>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="qr-info">
          <div className="order-id-badge">
            {qrData.orderId}
          </div>
          <div className="order-details">
            <p><strong>Club:</strong> {qrData.club}</p>
            <p><strong>Total:</strong> ${qrData.total}</p>
            <p><strong>Items:</strong> {qrData.items.length}</p>
          </div>
        </div>

        {/* Security Features */}
        <div className="security-features">
          <div className="security-item">
            <i className="fa fa-shield-check text-success"></i>
            <span>Secure QR Code</span>
          </div>
          <div className="security-item">
            <i className="fa fa-clock text-warning"></i>
            <span>Expires in 24h</span>
          </div>
          <div className="security-item">
            <i className="fa fa-one-time text-info"></i>
            <span>One-time use</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="qr-actions-footer">
        <button 
          className="btn btn-primary"
          onClick={handleDownload}
        >
          <i className="fa fa-download me-2"></i>
          Download QR
        </button>
        <button 
          className="btn btn-outline-primary"
          onClick={handleShare}
        >
          <i className="fa fa-share-alt me-2"></i>
          Share
        </button>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => window.print()}
        >
          <i className="fa fa-print me-2"></i>
          Print
        </button>
      </div>

      {/* Instructions */}
      <div className="qr-instructions">
        <h6>How to use:</h6>
        <ol>
          <li>Show this QR code at the club's pickup counter</li>
          <li>Staff will scan it to verify your order</li>
          <li>Collect your drinks and enjoy!</li>
        </ol>
      </div>
    </div>
  )
}

export default QRDisplay