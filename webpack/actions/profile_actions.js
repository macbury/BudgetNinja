import Dispatcher from '../lib/dispatcher';
import Constants from '../constants/profiles_constants';
import { get } from 'jquery';

const FETCH_PROFILES_ENDPOINT = '/api/profiles';

class ProfileActions {
  /**
  * Fetch profiles from server
  */
  fetch() {
    Dispatcher.dispatch({ actionType: Constants.PROFILES_FETCH });

    get(FETCH_PROFILES_ENDPOINT).then(function(resp) {
      Dispatcher.dispatch({ actionType: Constants.PROFILES_FETCH_SUCCESS, profiles: resp.profiles });
    }).fail(function(error) {
      Dispatcher.dispatch({ actionType: Constants.PROFILES_FETCH_FAILURE, error: error.responseJSON.errors.join(', ') });
    });
  }

  fetchInNextTick() {
    setTimeout(this.fetch.bind(this), 1);
  }

  /**
  * set current profile
  */
  setCurrent(profile) {
    Dispatcher.dispatch({ actionType: Constants.PROFILES_SET, profile: profile });
  }
}

export default new ProfileActions();
