import { EventEmitter } from 'events';
import Dispatcher from '../lib/dispatcher';
import FlashMessageConstants from '../constants/flash_message_constants';
import SessionConstants from '../constants/session_constants';
import ProfileConstants from '../constants/profiles_constants';
import RegistrationConstants from '../constants/registration_constants';
/**
* This store contains all flash messages sended by application
*/

const FLASH_TIMEOUT = 2000;
class FlashMessagesStore extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this.onAction.bind(this));
    this.flashes = [];
    this.id = 0;
  }

  /**
  * Add new flash message
  */
  addFlash(type, message) {
    this.id += 1;
    const flash = { type, message };
    flash.id = this.id;
    this.flashes.push(flash);
    this.emit('change');

    //TODO reimplement this
    setTimeout(() => {
      var index = this.flashes.indexOf(flash);
      if (index != -1) {
        this.flashes.splice(index, 1);
      }
      this.emit('change');
    }, FLASH_TIMEOUT);
  }

  getFlashes() {
    return this.flashes;
  }

  /**
  * Return new flash message to display
  */
  pop() {
    return this.flashes.pop();
  }

  onAction(action) {
    switch (action.actionType) {
      case FlashMessageConstants.FLASH_NOTICE:
        this.addFlash('success', action.message);
      break;

      case FlashMessageConstants.FLASH_ERROR:
        this.addFlash('error', action.message);
      break;

      case SessionConstants.SESSION_CREATE_SUCCESS:
        this.addFlash('success', 'Signed in successfully.');
      break;

      case SessionConstants.SESSION_CREATE_FAILURE:
        this.addFlash('error', 'Cannot sign in: ' + action.error);
      break;

      case SessionConstants.SESSION_DESTROY_SUCCESS:
        this.addFlash('success', 'Signed out successfully.');
      break;

      case ProfileConstants.PROFILES_FETCH_FAILURE:
        this.addFlash('error', 'Cannot fetch profiles: ' + action.error);
      break;

      case RegistrationConstants.REGISTRATION_CREATE_FAILURE:
        this.addFlash('error', 'Cannot create new account: ' + action.error);
      break;

      case RegistrationConstants.REGISTRATION_CREATE_SUCCESS:
        this.addFlash('success', 'Created new account! You can now log in!');
      break;
    }
  }
}

export default new FlashMessagesStore();
