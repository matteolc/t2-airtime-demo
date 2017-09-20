import { AUTH_ERROR } from 'admin-on-rest';

export default (type, params) => {
    
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {    
            return Promise.reject();
        }
        return Promise.resolve();
    }
    return Promise.resolve();
};