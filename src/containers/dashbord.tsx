import React from 'react'
import AddDevice from './addDevice/index'
import CheckDevice from './checkDevice/index'
import '../App.scss'


const Dashbord: React.FC = () => {
  let [menuItem, setMenuItem] = React.useState(0)

  const menu = () => {
    return (
      <ul className="dashbord--menu">
        <li 
          className={ menuItem === 0 ? "menu--item active" : "menu--item" }
          onClick={ () => setMenuItem(0) }>
            <p>Добавить устройство</p>
        </li>
        <li
          className={ menuItem === 1 ? "menu--item active" : "menu--item" }
          onClick={ () => setMenuItem(1) }>
            <p>Проверить статус</p>
        </li>
      </ul>
    )
  }

  return (
    <div className="app--dashbord">
      <h1 className="dashbord--title">Настройка OTBox</h1>
      { menu() }
      { menuItem === 0
        ? <AddDevice />
        : <CheckDevice />
      }
    </div>
  )
}
export default Dashbord