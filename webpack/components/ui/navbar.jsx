import React from 'react';
import { Link } from 'react-router'
import styles from './navbar.scss';
import SessionActions from '../../actions/session_actions';
import ProfileActions from '../../actions/profile_actions';
import ProfileStore from '../../stores/profiles_store';
import LogoutLink from './logout_link.jsx';

const MENU_ITEMS = [
  { name: 'Operations', url: '/' },
  { name: 'Budget', url: '/budget' },
  { name: 'Accounts', url: '/accounts' }
];

/**
* Top toolbar with hamburger
*/
export default class NavigationBar extends React.Component {

  constructor() {
    super();

    this.state = {
      dropDownOpen: false,
      profileName:  ProfileStore.getCurrentProfileName()
    };

    this._updateProfileState = this.updateProfileState.bind(this);
  }

  updateProfileState() {
    this.setState({
      profileName:  ProfileStore.getCurrentProfileName()
    });
  }

  componentWillMount() {
    ProfileStore.on('change', this._updateProfileState);
  }

  componentWillUnmount() {
    ProfileStore.removeListener('change', this._updateProfileState);
  }

  /**
  * Toggle dropdown
  */
  onToggleDropDownClick(e) {
    e.preventDefault();
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  }

  onSwitchProfileClick(e) {
    e.preventDefault();
    ProfileActions.reset();
    this.setState({ dropDownOpen: false });
  }

  /**
  * Hide dropdown
  */
  onMenuItemClick(e) {
    this.setState({ dropDownOpen: false });
  }

  /**
  * Build menu items
  */
  getMenuItems() {
    return MENU_ITEMS.map((menu_item)=> {
      return <li key={ menu_item.name }>
        <Link onClick={ this.onMenuItemClick.bind(this) } to={ menu_item.url }>{ menu_item.name }</Link>
      </li>
    });
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
            <li className={ styles['dropdown-header'] }>{ this.state.profileName }</li>
            <li>
              <a href="#" onClick={this.onSwitchProfileClick.bind(this)}>Switch profile</a>
            </li>
            <li className={ styles.divider } />
            { this.getMenuItems() }
            <li className={ styles.divider } />
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
