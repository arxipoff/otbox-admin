import React from 'react'
import { OnetrakLogo } from '../icons'
import './index.scss'


const Header: React.FC = () => {
    return (
      <div className="app-header">
        <div className="header-logo">
          <a className="logo" href="http://www.onetrak.ru">
            <OnetrakLogo />
          </a>
        </div>
      </div>
    )
}
export default Header