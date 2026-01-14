// This component displays category filter buttons (like YouTube)
// It allows users to filter videos based on category

const FilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      {/* Loop through categories and render buttons */}
      {categories.map((category) => (
        <button
          key={category}
          className={
            activeCategory === category
              ? "filter-btn active"
              : "filter-btn"
          }
          // When clicked, update active category in parent
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
