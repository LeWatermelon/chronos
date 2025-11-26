import { useEffect } from 'react';
import './BodyClassController.css'

function BodyClassController({ route }) {
    useEffect(() => {
        const authRoutes = ['/login', '/register', '/verify-email', '/password-reset', '/home', '/'];

        if (authRoutes.includes(route) || route.startsWith('/password-reset')) {
            document.body.classList.add('auth-page');
        } else {
            document.body.classList.remove('auth-page');
        }
    }, [route]);
    return null;
}

export default BodyClassController;