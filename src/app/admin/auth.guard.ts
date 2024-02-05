import { CanActivateFn } from '@angular/router';

export const authGuardAdmin: CanActivateFn = (route, state) => {
  
  var isLoggedIn = localStorage.getItem('loggedIn');
  var userRole = localStorage.getItem('userRole');

  if (isLoggedIn === 'true' && userRole === 'admin') {
    return true;
  }
  
  location.href = '/';

  return false;
};