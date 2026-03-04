import { environment } from '../../../environments/environment';

export const App_Apis = {
  auth: {
    // register :'https://route-posts.routemisr.com/users/signup',
    register: `${environment.baseUrl}/users/signup`,
    login: `${environment.baseUrl}/users/signin`,
  },
  posts: {
    add: `${environment.baseUrl}/posts`,
    get: `${environment.baseUrl}/posts`,
  },
  comments: {
    add: `${environment.baseUrl}/posts`,
    get: `${environment.baseUrl}/posts`,
  },
  suggestions: {
    get: `${environment.baseUrl}/users/suggestions?limit=10`,
    toggleFollowUsers: `${environment.baseUrl}/users`,
  },
};
