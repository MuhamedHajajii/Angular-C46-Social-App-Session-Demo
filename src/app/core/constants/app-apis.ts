import { environment } from '../../../environments/environment';

export const App_Apis = {
  auth: {
    // register :'https://route-posts.routemisr.com/users/signup',
    register: `${environment.baseUrl}/users/signup`,
    login: `${environment.baseUrl}/users/signin`,
  },
};
