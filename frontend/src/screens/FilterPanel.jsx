import FilterListToggle from "./FilterListToggle";
import { brandList } from "./BrandsList";




const FilterPanel = ({handleBrands, selectedPrice, handlePrice, categories, handleChecked, selectedBrands}) => {
  return (
    <div>
    <div className="filter-panel">
        <p className="label">Brands</p>
      <FilterListToggle options={brandList} value={selectedBrands} selectToggle={handleBrands}/>
    </div>

    </div>
  )
}

export default FilterPanel