// fakeKeycloak.js
import { EventEmitter } from 'events';

class FakeKeycloak extends EventEmitter {
    constructor() {
        super();
        this.authenticated = false;
        this.token = null;
        this.tokenParsed = null;
        this.initialized = false;
    }

    init = () => {
        return new Promise((resolve) => {
            this.initialized = true;
            this.emit('onReady', true); // ReactKeycloakProvider ждёт это событие
            resolve(true);
        });
    };

    login = () => {
        console.log('Login вызван, но Keycloak отключён');
    };

    logout = () => {
        console.log('Logout вызван, но Keycloak отключён');
    };

    updateToken = () => Promise.resolve();

    clearToken = () => {};
}

export const fakeKeycloak = new FakeKeycloak();
