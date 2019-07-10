import './app-menu.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import cx from 'classnames'


const BurgerBar = ({isActive, toggleActive}) =>
  <button
    aria-pressed={isActive}
    onClick={() => toggleActive(!isActive)}
    className={cx(`hamburger hamburger--spin`, { 'is-active': isActive })}
    type="button"
  >
    <span className="hamburger-box">
      <span className="hamburger-inner"></span>
    </span>
  </button>


const renderLinks = ({isActive, toggleActive}) => {

  return (
    <ul className="pure-menu-list">
      <li className="pure-menu-item" onClick={() => toggleActive(!isActive)}>
        <Link
          to="/page-2"
          className="pure-menu-link"
          activeClassName="selected-link"
          >
            Page 2
        </Link>
      </li>
      <li className="pure-menu-item" onClick={() => toggleActive(!isActive)}>
        <Link
          to="/"
          className="pure-menu-link"
          activeClassName="selected-link"
          >
            Home
        </Link>
      </li>
    </ul>
  )
}

const BurgerMenu = (props) =>
  <React.Fragment>
    <div
      className={cx("pure-menu sidebar-menu", { 'is-active': props.isActive })}
    >
      { renderLinks(props) }
    </div>
    <div
      className={cx("pure-menu pure-menu-horizontal", { 'is-active': props.isActive })}
    >
      { renderLinks({...props, toggleActive: () => {} })}
    </div>
  </React.Fragment>


const AppMenu = () => {
  const [isActive, toggleActive] = useState(false)

  useEffect(() => {
    const targetElement = document.querySelector('.sidebar-menu')
    if (isActive) {
      disableBodyScroll(targetElement)
    } else {
      enableBodyScroll(targetElement)
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  })

  return (
    <React.Fragment>
      <BurgerMenu isActive={isActive} toggleActive={toggleActive} />
      <BurgerBar isActive={isActive} toggleActive={toggleActive} />
    </React.Fragment>
  )
}


export default AppMenu