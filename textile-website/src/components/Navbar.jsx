import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">TextileBrand</h2>

            <div className="nav-links">
                <a href="/">Home</a>
                <a href="#products">Products</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
            </div>

            <button className="enquire-btn">
                Enquire Now
            </button>
        </nav>
    )
}

export default Navbar