import { EventEmitter } from 'events';
import Dispatcher from '../lib/dispatcher';
import SessionContstants from '../constants/session_constants';
import ProfileContstants from '../constants/profiles_constants';
import cookie from 'react-cookie';
import moment from 'moment';
const COOKIE_SELECTED_PROFILE_ID = 'COOKIE_SELECTED_PROFILE_ID';
const COOKIE_OPTIONS             = {
  path: '/',
  expires: moment().add(7, 'days')._d
};
const CHANGE_EVENT = 'change';
/**
* Here are stored all profiles that user have, and additionaly it contains current profile selected by user
**/
class ProfilesStore extends EventEmitter {
  constructor() {
    super();
    this.profiles = null;
    Dispatcher.register(this.handleDispatcherActions.bind(this));
  }

  handleDispatcherActions(action) {
    switch(action.actionType) {
      case SessionContstants.SESSION_DESTROY_SUCCESS:
        this.profiles = null;
        this.setCurrentProfile(null);
        this.emit(CHANGE_EVENT);
      break;

      case ProfileContstants.PROFILES_FETCH_SUCCESS:
        this.profiles = action.profiles;
        this.emit(CHANGE_EVENT);
      break;

      case ProfileContstants.PROFILES_SET:
        this.setCurrentProfile(action.profile);
        this.emit(CHANGE_EVENT);
      break;

      case ProfileContstants.PROFILES_RESET:
        this.setCurrentProfile(null);
        this.emit(CHANGE_EVENT);
      break;
    }
  }

  setCurrentProfile(newProfile) {
    this.currentProfile = newProfile;
    if (this.currentProfile == null) {
      cookie.remove(COOKIE_SELECTED_PROFILE_ID, COOKIE_OPTIONS);
    } else {
      cookie.save(COOKIE_SELECTED_PROFILE_ID, this.currentProfile, COOKIE_OPTIONS);
    }
  }

  /**
  * Return current profile id
  */
  getCurrentProfileId() {
    if (this.getCurrentProfile() != null) {
      return this.getCurrentProfile().id;
    } else {
      return null;
    }
  }

  getCurrentProfile() {
    if (this.currentProfile == null) {
      this.currentProfile = cookie.load(COOKIE_SELECTED_PROFILE_ID);
    }
    return this.currentProfile;
  }

  getCurrentProfileName() {
    var currentProf = this.getCurrentProfile();
    return currentProf == null ? null : currentProf.name;
  }

  getAll() {
    return this.profiles;
  }

  /**
  * @param {function} callback
  */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
  * @param {function} callback
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

export default new ProfilesStore();
