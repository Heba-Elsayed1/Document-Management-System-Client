import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localToken = localStorage.getItem("authToken");
  const router = inject(Router);

  const clonedRequest = localToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${localToken}`,
        },
      })
    : req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 ) {
        router.navigate(['/login']);
      }
      throw error; 
    })
  );
};


// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const localToken = localStorage.getItem("authToken");
//   if (localToken) {
//     const myreq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${localToken}`
//     }
//   });
//   return next(myreq);
//   } else {
//     return next(req);
//   }

  
// };