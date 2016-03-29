import { EventEmitter } from 'events';
import Auth from 'j-toker';
import Dispatcher from '../lib/dispatcher';
import PubSub from 'pubsub-js';
import SessionContstants from '../constants/session_constants';
const API_ENDPOINT = '/api';

/**
* This store contains bridge between 'j-toker' user resource and react application.
* It will emmit events when user logs in, or logs out, and allows user to login, register, and remember password
*/
class SessionStore extends EventEmitter {
  constructor() {
    super();
    this.user = null;
    this.booting = true;
    PubSub.subscribe('auth', function() {
      this.setUser(Auth.user);
      if (this.booting) {
        this.emit('boot');
      }
      this.booting = false;
    }.bind(this));

    this.configureAuth();

    Dispatcher.register(this.handleDispatcherActions.bind(this));
  }

  handleDispatcherActions(action) {
    switch(action.actionType) {
      case SessionContstants.SESSION_CREATE_SUCCESS:
        this.setUser(Auth.user);
      break;

      case SessionContstants.SESSION_DESTROY_SUCCESS:
        this.setUser(null);
      break;
    }
  }

  /**
  * Set current user, and emmit change event
  */
  setUser(newUser) {
    this.user = newUser;
    this.emit('change');
  }

  /**
  * Return current user
  */
  getUser() {
    return this.user;
  }

  /**
  * Configure jToker Auth
  */
  configureAuth() {
    Auth.configure({
      apiUrl: API_ENDPOINT,
      validateOnPageLoad: true
    });
  }

  /**
  * Return true if user is logged in
  */
  isLoggedIn() {
    return this.user !== null && Object.keys(this.user).length > 0;
  }
}

const sessionStore  = new SessionStore();
export default sessionStore;
