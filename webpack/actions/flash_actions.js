import Dispatcher from '../lib/dispatcher';
import Constants from '../constants/flash_message_constants';

class FlashActions {
  /**
  * Show notice flash message
  */
  notice(message) {
    Dispatcher.dispatch({
      actionType: Constants.FLASH_NOTICE,
      message: message
    });
  }

 /**
 * Show error flash message
 */
  error(message) {
    Dispatcher.dispatch({
      actionType: Constants.FLASH_ERROR,
      message: message
   });
 }
}


export default new FlashActions();
