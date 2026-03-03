import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingAnimation } from '../LoadingAnimation';

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingAnimation />
            </div>
        );
    }

    if (!user) {
        // Redireciona para o login e salva aonde ele estava tentando ir
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se tem usuário logado, permite renderizar as rotas filhas
    return <Outlet />;
}
