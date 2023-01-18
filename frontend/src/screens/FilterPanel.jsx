
import { useEffect } from "react";
import { useRef } from "react";
import CheckboxProt from "./CheckboxProt";

const FilterPanel = ({ categories, handleChecked}) => {
  const checkboxMenu = useRef()
  const dropdown = useRef()
  const checkboxToggle = ()=> {
     checkboxMenu.current.classList.toggle('hide-checkbox')
     dropdown.current.classList.toggle('category-icon_rotate')  
  }
 
  return (
    // Agregamos el manejador de eventos al elemento padre del componente FilterPanel
    <div className="filter-panel" >
      <div className="category-title" onClick={()=> checkboxToggle() }>
      <span ><h5>Categories  <i className="bx bx-chevron-down" ref={dropdown}></i></h5> </span>
      </div>
      <div className="checkbox-group hide-checkbox" ref={checkboxMenu}>
        {categories.map((category)=> (
          <CheckboxProt category={category} handleChecked={handleChecked} key={category.id}/>
        ))} 
      </div>
    </div>
  )
}

export default FilterPanel