import React from 'react';
import { Link } from 'react-router'
import styles from './navbar.scss';
import SessionActions from '../../actions/session_actions';
import LogoutLink from './logout_link.jsx';

/**
* Top toolbar with hamburger
*/
export default class NavigationBar extends React.Component {

  constructor() {
    super();

    this.state = {
      dropDownOpen: false
    };
  }

  onToggleDropDownClick(e) {
    e.preventDefault();
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  }

  render() {
    var dropDownClass = this.state.dropDownOpen ? styles.menu_opened : styles.menu_closed;

    return <div className={ styles.toolbar }>
      <div className={ styles.toolbar_inner }>
        <div className={ styles['navbar-header'] }>
          <button type="button" className={ styles.hamburger + ' hamburger' } onClick={ this.onToggleDropDownClick.bind(this) }>
            <span className={ styles['icon-bar'] }></span>
            <span className={ styles['icon-bar'] }></span>
            <span className={ styles['icon-bar'] }></span>
          </button>
          <ul className={ dropDownClass }>
            <li>
              <LogoutLink />
            </li>
          </ul>

          <Link className={ styles.brand } to="/">Budget Ninja</Link>
        </div>
      </div>
    </div>;
  }
}

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
