

const SearchBar = ({value, changeInput}) => {
  return (
    <div className='searchBar-wrap'>
      <i className="fa fa-search"></i>
    <input
      type='text'
      placeholder='Search Something Special'
      value={value}
      onChange={changeInput}
    />
  </div>
  )
}

export default SearchBar