import Dispatcher from '../lib/dispatcher';
import SessionContstants from '../constants/session_constants';
import Auth from 'j-toker';

/**
* Action for creating and destroying current user session
*/
class SessionActions {
  /**
  * Sign in user using email, and password. On start it will emit {@link SessionContstants.SESSION_CREATE}. If login is succeed then {@link SessionContstants.SESSION_CREATE_SUCCESS},
  * otherwise it will emit {@link SessionContstants.SESSION_CREATE_FAILURE} with error
  */
  create(email, password) {
    Dispatcher.dispatch({ actionType: SessionContstants.SESSION_CREATE });

    Auth.emailSignIn({ email, password }).then(function(result) {
      Dispatcher.dispatch({ actionType: SessionContstants.SESSION_CREATE_SUCCESS });
    }).fail(function(error) {
      Dispatcher.dispatch({ actionType: SessionContstants.SESSION_CREATE_FAILURE, error: error.reason });
    });
  }

  /**
  * Sign out current user. On start it emits {@link SessionContstants.SESSION_DESTROY}.
  * After succesfull sign out it will emmit {@link SessionContstants.SESSION_DESTROY_SUCCESS}
  */
  destroy() {
    Dispatcher.dispatch({ actionType: SessionContstants.SESSION_DESTROY });

    Auth.signOut().then(function() {
      Dispatcher.dispatch({ actionType: SessionContstants.SESSION_DESTROY_SUCCESS });
    }).fail(function() {
      Dispatcher.dispatch({ actionType: SessionContstants.SESSION_DESTROY_SUCCESS });
    });
  }
}

export default new SessionActions();
