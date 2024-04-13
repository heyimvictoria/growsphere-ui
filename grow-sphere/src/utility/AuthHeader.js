// grow-sphere\src\utility\AuthHeader.js

import { useAuth } from '../context/AuthContext';

export default function authHeader() {
    const { currentUser } = useAuth();

    if (currentUser && currentUser.token) {
        return { Authorization: 'Bearer ' + currentUser.token };
    } else {
        return {};
    }
}
