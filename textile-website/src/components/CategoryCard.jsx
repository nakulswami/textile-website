function CategoryCard({ name, description }) {
  return (
    <div className="category-card">
      <div className="category-image">
        {name}
      </div>

      <h3>{name}</h3>

      <p>{description}</p>
    </div>
  )
}

export default CategoryCard