
import { useRef } from "react";
import CheckboxProt from "./CheckboxProt";

const FilterPanel = ({ categories, handleChecked}) => {
  const checkbox = useRef(null)

  const dropdownCategoryMenu = () => {
    checkbox.current.classList.toggle('hide-checkbox');
   const site = document.querySelector('.site-container')
   /*site.addEventListener('click', (e)=> {
      checkbox.current.classList.contains('hide-checkbox') && checkbox.current.classList.remove('hide-checkbox');
      console.log(e)
    })*/
  };
  return (
    // Agregamos el manejador de eventos al elemento padre del componente FilterPanel
    <div className="filter-panel">
      <div className="category-title">
      <span onClick={(e)=> dropdownCategoryMenu(e)} ><h5>Categories<i className="bx bx-chevron-down  "></i></h5></span>
      </div>
      <div className="checkbox-group hide-checkbox" ref={checkbox}>
        {categories.map((category)=> (
          <CheckboxProt category={category} handleChecked={handleChecked} key={category.id}/>
        ))} 
      </div>
    </div>
  )
}

export default FilterPanel