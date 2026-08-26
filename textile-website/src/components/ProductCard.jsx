function ProductCard({ category, name }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {name}
      </div>

      <div className="product-info">
        <p className="product-category">{category}</p>

        <h3>{name}</h3>

        <button>Get Quote →</button>
      </div>
    </div>
  )
}

export default ProductCard