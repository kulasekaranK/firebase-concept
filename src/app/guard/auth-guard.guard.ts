import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { map, first, tap } from 'rxjs/operators';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const firebase = inject(FirebaseService);

  return firebase.isAuthenticated().pipe(
   
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
  
};
