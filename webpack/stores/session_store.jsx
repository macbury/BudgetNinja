import { EventEmitter } from 'events';
import Auth from 'j-toker';
import PubSub from 'pubsub-js';

const API_ENDPOINT = '/api';

/**
* This store contains bridge between 'j-toker' user resource and react application.
* It will emmit events when user logs in, or logs out, and allows user to login, register, and remember password
*/
class SessionStore extends EventEmitter {
  constructor() {
    super();
    this.user = null;
    PubSub.subscribe('auth', function() {
      this.setUser(Auth.user);
    }.bind(this));

    this.configureAuth();
  }

  /**
  * Log in user using, email and password. Returns promise object with success callback, and error callback
  **/
  login(email, password) {
    return Auth.emailSignIn({ email, password });
  }

  /**
  * Register new user using params
  */
  register(options) {
    return Auth.emailSignUp(options);
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
window.sessionStore = sessionStore;
export default sessionStore;
