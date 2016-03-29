import Dispatcher from '../lib/dispatcher';
import Constants from '../constants/registration_constants';
import Auth from 'j-toker';

/**
* Actions for user registration
*/
class RegistrationActions {
  /**
  * Sign up user using email, and password. On start it will emit {@link REGISTRATION_CREATE}. If login is succeed then {@link SessionContstants.SESSION_CREATE_SUCCESS},
  * otherwise it will emit {@link SessionContstants.SESSION_CREATE_FAILURE} with error
  */
  create(email, password, password_confirmation) {
    Dispatcher.dispatch({ actionType: Constants.REGISTRATION_CREATE });

    Auth.emailSignUp({ email, password, password_confirmation }).then(function(result) {
      Dispatcher.dispatch({ actionType: Constants.REGISTRATION_CREATE_SUCCESS });
    }).fail(function(error) {
      Dispatcher.dispatch({ actionType: Constants.REGISTRATION_CREATE_FAILURE, error: error.reason, validations: error.data.errors });
    });
  }
}

export default new RegistrationActions();
