import { HttpInterceptorFn } from '@angular/common/http';
import { Stored_Keys } from '../constants/stored-keys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // req

  const token = JSON.parse(localStorage.getItem(Stored_Keys.token)!);

  if (token) {
    return next(
      req.clone({
        setHeaders: {
          token: token,
        },
      }),
    );
  }

  return next(req);
};
