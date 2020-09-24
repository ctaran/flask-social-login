import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    cacheUser,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { 
        return currentUserSubject.value 
    }
};

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`/api/login`, requestOptions);
    const user = await handleResponse(response);
    cacheUser(user);
    return user;
}

function cacheUser(user) {
    // store external user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}