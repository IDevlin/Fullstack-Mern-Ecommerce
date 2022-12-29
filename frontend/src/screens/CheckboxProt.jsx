import Form from 'react-bootstrap/Form';

const CheckboxProt = ({key, category, handleChecked}) => {
    const {id} = category
  return (
    <div className='checkbox'>
          <Form>     
        <div className="mb-3">
          <Form.Check 
            reverse
            type={'checkbox'}
            id={'checkbox'}
            label={category.label}
            onChange={()=> handleChecked(id)}
          />      
        </div>
    </Form>
    </div>
  )
}

export default CheckboxProt