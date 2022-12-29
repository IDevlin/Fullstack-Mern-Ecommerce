import FilterListToggle from "./FilterListToggle";
import { brandList } from "./list";
import CheckboxProt from "./CheckboxProt";




const FilterPanel = ({handleBrands, selectedPrice, handlePrice, categories, handleChecked, selectedBrands}) => {

  return (
    <div className="filter-panel">
    
    <div >
        <h5 className="label">Brands</h5>
      <FilterListToggle options={brandList} value={selectedBrands} selectToggle={handleBrands}/>
    </div>
    <h5>Categories</h5>
    <div className="checkbox-group">
       {categories.map((category)=> (
        <CheckboxProt category={category} handleChecked={handleChecked}/>
       ))} 
    </div>

    </div>
  )
}

export default FilterPanel