import Dispatcher from '../lib/dispatcher';
import SessionContstants from '../constants/session_constants';

class SessionActions {
  /**
  * Sign in user using email, and password
  */
  create(email, password) {
    Dispatcher.dispatch({
      actionType: SessionContstants.SESSION_CREATE,
      email: email,
      password: password
    });
  }

  /**
  * Sign out current user
  */
  destroy() {
    Dispatcher.dispatch({
      actionType: SessionContstants.SESSION_DESTROY
    });
  }
}

export default new SessionActions();
