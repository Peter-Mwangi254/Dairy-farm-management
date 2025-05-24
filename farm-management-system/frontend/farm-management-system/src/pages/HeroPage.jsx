import { Link } from 'react-router-dom';
import '../App.css';

export default function HeroPage() {
  return (
    <div className="hero-page">
      <div className="hero-content">
        <h1 className="hero-title">Streamline Your Dairy Operations with Ease</h1>
        <p className="hero-subtitle">Track milk production, sales, and inventory in one smart dashboard.</p>
        <div className="hero-buttons">
          <Link to="/signup" className="hero-button">
            Get Started
          </Link>
          <Link to="/demo" className="hero-button">
            Request a Demo
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Milk Collection and Tracking</h3>
            <p>Efficiently track milk production and collection data.</p>
          </div>
          <div className="feature-card">
            <h3>Sales and Revenue Logging</h3>
            <p>Monitor sales and revenue with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Farmer and Livestock Management</h3>
            <p>Manage farmer profiles and livestock details.</p>
          </div>
          <div className="feature-card">
            <h3>Inventory and Feed Tracking</h3>
            <p>Keep track of feed and inventory levels.</p>
          </div>
          <div className="feature-card">
            <h3>Automated Report Generation</h3>
            <p>Generate insightful reports automatically.</p>
          </div>
          <div className="feature-card">
            <h3>SMS Notifications to Farmers</h3>
            <p>Send automated SMS alerts for payment confirmations, collection schedules, or important updates.</p>
          </div>
          <div className="feature-card">
            <h3>Daily Collection Summary Dashboard</h3>
            <p>Display daily totals of milk collected, revenue earned, and number of farmers served.</p>
          </div>
          <div className="feature-card">
            <h3>Payment Tracking and History</h3>
            <p>Track payments to ensure transparency and accountability.</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <img src="/path/to/photo1.jpg" alt="Farmer 1" />
            <p>"This system has transformed the way I manage my dairy farm!"</p>
            <h4>John Doe, Dairy Farmer</h4>
          </div>
          <div className="testimonial">
            <img src="/path/to/photo2.jpg" alt="Farmer 2" />
            <p>"A must-have tool for every dairy cooperative."</p>
            <h4>Jane Smith, Co-op Manager</h4>
          </div>
        </div>
      </div>

      <div className="screenshot-section">
        <h2>See It in Action</h2>
        <img src="/path/to/dashboard-mockup.jpg" alt="Dashboard Preview" className="dashboard-preview" />
        <p>Our intuitive dashboard makes dairy management a breeze.</p>
      </div>

      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Create your account to get started.</p>
          </div>
          <div className="step">
            <h3>2. Add Farmers and Livestock</h3>
            <p>Input details about your farmers and livestock.</p>
          </div>
          <div className="step">
            <h3>3. Record Milk and Sales</h3>
            <p>Track milk production and sales data.</p>
          </div>
          <div className="step">
            <h3>4. View Reports and Optimize</h3>
            <p>Analyze reports to improve your operations.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start managing your dairy today – it’s free and easy!</h2>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </div>
    </div>
  );
}