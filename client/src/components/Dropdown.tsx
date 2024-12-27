import './Dropdown.css'
export const Dropdown = () => {

  return(
    <div className='dropdown'>
      <div><a href='#'>Menu</a></div>
      <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
        <li><a href="#">Item 3</a></li>
      </ul>
    </div>
  )
}