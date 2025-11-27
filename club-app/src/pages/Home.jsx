// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClub } from '../context/ClubContext';
import ClubCard from '../components/ClubCard';
import './Home.css';

const Home = () => {
  const { clubs, fetchClubs } = useClub();
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentAnimatedText, setCurrentAnimatedText] = useState(0);

  const animatedTexts = [
    "Secure Payments",
    "Best Clubs",
    "Instant Pickup",
    "5% Commission",
    "QR Code Access"
  ];

  // Online club image URL
  const clubImageUrl = "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";

  useEffect(() => {
    const clubsData = fetchClubs();
    setFeaturedClubs(clubsData.slice(0, 3));
  }, [fetchClubs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimatedText((prev) => (prev + 1) % animatedTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "How ClubSync Works",
      content: [
        {
          subtitle: "Browse & Pre-Order",
          description: "Explore premium clubs and pre-order your drinks and food before you arrive."
        },
        {
          subtitle: "Secure Payment", 
          description: "Pay safely through our encrypted payment system with instant confirmation."
        },
        {
          subtitle: "QR Code Pickup",
          description: "Skip the lines and use your unique QR code for instant pickup at the club."
        }
      ]
    },
    {
      title: "Secure Payment System",
      content: [
        {
          subtitle: "Encrypted Payments",
          description: "Customers pay securely through our integrated, encrypted payment system."
        },
        {
          subtitle: "Success & Commission", 
          description: "Transaction completes with only 5% commission"
        }
      ]
    },
    {
      title: "Club Benefits",
      content: [
        {
          subtitle: "Increased Revenue",
          description: "Clubs boost sales with pre-orders and reduce wait times at bars."
        },
        {
          subtitle: "Smart Analytics",
          description: "Real-time insights help clubs optimize menu offerings and operations."
        }
      ]
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">
                Experience Nightlife
                <span className="highlight"> Reimagined</span>
              </h1>
              <p className="hero-description">
                Skip the lines, avoid the wait. Pre-order your drinks and food from the best clubs 
                in town. Enjoy seamless ordering, secure payments, and instant pickup with QR codes.
              </p>
              
              {/* Animated Text */}
              <div className="animated-text-container">
                <span className="animated-text">
                  {animatedTexts[currentAnimatedText]}
                </span>
              </div>

              <div className="hero-actions">
                <Link to="/clubs" className="btn btn-primary btn-glow">
                  Start Shopping
                </Link>
                <Link to="/register" className="btn btn-secondary btn-shine">
                  Start Selling
                </Link>
              </div>
              <div className="commission-badge">
                Safe, secure, and simple platform with only 5% commission
              </div>
            </div>
            
            {/* Club Image */}
            <div className="hero-image">
              <img 
                src={clubImageUrl} 
                alt="Club atmosphere with people enjoying nightlife" 
                className="club-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="image-fallback" style={{display: 'none'}}>
                <div className="fallback-content">
                  <i className="fas fa-music"></i>
                  <p>Club Experience</p>
                </div>
              </div>
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Payment Section */}
      <section className="payment-section">
        <div className="container">
          <div className="payment-content">
            <h2>Secure Payment</h2>
            <p>Customers pay securely through our integrated, encrypted payment system.</p>
            <div className="divider"></div>
            <div className="success-commission">
              <strong>Success & Commission</strong>
              <p>Transaction completes with only 5% commission</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Accordion Section */}
      <section className="accordion-section">
        <div className="container">
          <div className="section-header">
            <h2>How ClubSync Works</h2>
            <p>Simple, secure, and seamless nightlife experience</p>
          </div>
          <div className="accordion-container">
            {accordionItems.map((item, index) => (
              <div key={index} className="accordion-item">
                <div 
                  className={`accordion-header ${activeAccordion === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h3>{item.title}</h3>
                  <span className="accordion-icon">
                    {activeAccordion === index ? '−' : '+'}
                  </span>
                </div>
                <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
                  <div className="accordion-content-inner">
                    {item.content.map((contentItem, contentIndex) => (
                      <div key={contentIndex} className="content-block">
                        <h4>{contentItem.subtitle}</h4>
                        <p>{contentItem.description}</p>
                        {contentIndex < item.content.length - 1 && <div className="content-divider" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-content">
            <h2>ClubSync</h2>
            <blockquote>
              "The club management tools and analytics have transformed how we operate our nightlife business."
            </blockquote>
            <div className="testimonial-author">
              <strong>Marcus Johnson</strong>
              <span>Nightclub Owner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section">
        <div className="container">
          <div className="workflow-grid">
            <div className="workflow-item">
              <h3>Club Lists Menu</h3>
              <p>Clubs create accounts and list their drinks and food with details, prices, and images.</p>
            </div>
            <div className="workflow-item">
              <h3>Customer Discovers</h3>
              <p>Customers search, filter, and find their favorite drinks from premium clubs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose ClubSync?</h2>
            <p>Experience the future of nightlife with our innovative features</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>Save Time</h4>
              <p>Skip the lines and waiting. Pre-order your drinks and pick them up instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-qrcode"></i>
              </div>
              <h4>QR Code Pickup</h4>
              <p>Simple and secure order pickup with unique QR codes for each transaction.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Secure Payments</h4>
              <p>Advanced payment security with chargeback protection and instant settlements.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h4>Mobile Friendly</h4>
              <p>Seamless experience across all devices with our responsive design.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Smart Analytics</h4>
              <p>Real-time insights for club owners to optimize their operations and revenue.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h4>24/7 Support</h4>
              <p>Round-the-clock customer support to ensure smooth experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section className="clubs-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Clubs</h2>
            <p>Discover the hottest spots in town</p>
          </div>
          <div className="clubs-grid">
            {featuredClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/clubs" className="btn btn-outline">
              View All Clubs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied users today</p>
            <div className="cta-actions">
              <Link to="/clubs" className="btn btn-primary btn-glow">
                Start Shopping →
              </Link>
              <Link to="/register" className="btn btn-secondary btn-shine">
                Start Selling →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;