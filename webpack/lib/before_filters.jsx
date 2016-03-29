import SessionStore from './../stores/session_store.jsx';

/**
* Check if user is logged in, if not go to /auth url
*/
function ensureUserIsLoggedIn(nextState, replaceState) {
  if (!SessionStore.isLoggedIn()) {
    replaceState({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

/**
* redirect to root path if user is logged in
*/
function ensureUserIsLoggedOut(nextState, replaceState) {
  if (SessionStore.isLoggedIn()) {
    replaceState({ pathname: '/' });
  }
}

export default { ensureUserIsLoggedIn, ensureUserIsLoggedOut };
