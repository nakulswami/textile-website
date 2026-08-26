import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import Navbar from '../components/Navbar'
import './Home.css'
import API_URL from "../api";


function Home() {
    const [showEnquiry, setShowEnquiry] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/api/enquiries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Enquiry sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setShowEnquiry(false);
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            alert("Could not connect to server");
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />

            <main className="hero">
                <div className="hero-content">
                    <p className="hero-tag">PANIPAT • HOME TEXTILES</p>

                    <h1>
                        Quality Textiles
                        <span> Made for Every Home.</span>
                    </h1>

                    <p className="hero-description">
                        Discover premium bedsheets, blankets, comforters,
                        and home furnishing products directly from Panipat.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="primary-btn"
                            onClick={() =>
                                document.getElementById("products").scrollIntoView({
                                    behavior: "smooth",
                                })
                            }
                        >
                            View Products
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => setShowEnquiry(true)}
                        >
                            Send Enquiry
                        </button>
                    </div>

                    {showEnquiry && (
                        <div className="enquiry-modal">
                            <div className="enquiry-box">
                                <button
                                    className="close-btn"
                                    onClick={() => setShowEnquiry(false)}
                                >
                                    ×
                                </button>

                                <h2>Send an Enquiry</h2>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Your Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                    <textarea
                                        name="message"
                                        placeholder="Write your enquiry..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button type="submit" className="primary-btn">
                                        Submit Enquiry
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <div className="hero-image">
                    <div className="image-placeholder">
                        Premium Home Textiles
                    </div>
                </div>
            </main>

            <section className="categories" id="products">
                <div className="section-heading">
                    <p>OUR COLLECTION</p>
                    <h2>Explore Our Product Categories</h2>
                    <span>
                        Discover quality home textile products for every requirement.
                    </span>
                </div>

                <div className="category-grid">

                    <CategoryCard
                        name="Bedsheets"
                        description="Comfort and style for every bedroom."
                    />

                    <CategoryCard
                        name="Blankets"
                        description="Warm, soft and made for comfort."
                    />

                    <CategoryCard
                        name="Comforters"
                        description="Premium comfort for every season."
                    />

                    <CategoryCard
                        name="Towels"
                        description="Soft and reliable everyday essentials."
                    />

                </div>
            </section >
            <section className="featured-products">
                <div className="featured-header">
                    <div>
                        <p className="section-label">FEATURED PRODUCTS</p>
                        <h2>Popular Textile Collections</h2>
                    </div>

                    <button className="view-all-btn">
                        View All Products →
                    </button>
                </div>

                <div className="products-grid">

                    <ProductCard
                        category="BEDROOM"
                        name="Premium Cotton Bedsheet"
                    />

                    <ProductCard
                        category="BLANKETS"
                        name="Soft Winter Blanket"
                    />

                    <ProductCard
                        category="COMFORTERS"
                        name="Luxury Comforter Set"
                    />

                </div>
            </section>
            <section className="why-choose" id="about">
                <div className="why-content">
                    <p className="section-label">WHY CHOOSE US</p>

                    <h2>Quality Textiles. Reliable Business.</h2>

                    <p className="why-description">
                        We connect customers and businesses with quality home textile
                        products sourced directly from Panipat.
                    </p>
                </div>

                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-number">01</div>
                        <h3>Quality Products</h3>
                        <p>
                            Carefully selected textile products designed for comfort,
                            durability and everyday use.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-number">02</div>
                        <h3>Direct Enquiries</h3>
                        <p>
                            Contact us directly for product details, pricing,
                            bulk orders and business requirements.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-number">03</div>
                        <h3>Panipat Textile Hub</h3>
                        <p>
                            Access quality home furnishing and textile products
                            from one of India's major textile hubs.
                        </p>
                    </div>
                </div>
            </section>
            <section className="enquiry-section" id="contact">
                <div className="enquiry-info">
                    <p className="section-label">GET IN TOUCH</p>

                    <h2>Looking for Quality Textiles?</h2>

                    <p>
                        Tell us what you are looking for and our team will get back
                        to you with product details, pricing and availability.
                    </p>

                    <div className="contact-details">
                        <p>📍 Panipat, Haryana, India</p>
                        <p>📞 +91 XXXXX XXXXX</p>
                        <p>✉️ your@email.com</p>
                    </div>
                </div>

                <form className="enquiry-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                    >
                        <option value="">Product Interested In</option>
                        <option value="Bedsheets">Bedsheets</option>
                        <option value="Blankets">Blankets</option>
                        <option value="Comforters">Comforters</option>
                        <option value="Towels">Towels</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        type="text"
                        name="quantity"
                        placeholder="Quantity / Requirement"
                        value={formData.quantity}
                        onChange={handleChange}
                    />

                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Tell us about your requirement..."
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit">
                        Send Enquiry →
                    </button>
                </form>
            </section>
        </div >
    )
}

export default Home