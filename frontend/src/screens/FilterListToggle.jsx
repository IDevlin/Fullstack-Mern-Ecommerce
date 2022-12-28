import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const FilterListToggle = ({options, value, selectToggle}) => {
    
    return (
        <ButtonGroup aria-label="Basic example" className='button-group' value={value} onChange={selectToggle}>
          {options.map(({label, id, value})=> (
            <div><Button variant="secondary"><img src={label} alt="" /></Button></div>
          ))}
        </ButtonGroup>
      );
}

export default FilterListToggle

/*<div><Button variant="secondary"></Button></div>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>*/