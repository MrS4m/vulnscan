import type { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

// Tipo base do perfil do usuário vindo da tabela `profiles`
export type UserProfile = {
    id: string;
    full_name: string | null;
    company: string | null;
    role: string;
};

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Busca o perfil da tabela `profiles` relacionado ao usuário autenticado
    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Erro ao buscar perfil:', error.message);
                setProfile(null);
            } else {
                setProfile(data as UserProfile);
            }
        } catch (error) {
            console.error('Erro inesperado ao buscar perfil:', error);
            setProfile(null);
        }
    };

    useEffect(() => {
        // Timeout de segurança: se o Supabase travar (Web Locks API), libera o app após 5s
        const safetyTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        // onAuthStateChange do Supabase v2+ dispara INITIAL_SESSION automaticamente,
        // eliminando a necessidade de chamar getSession() separadamente (evita race condition)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            try {
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                if (currentUser) {
                    await fetchProfile(currentUser.id);
                } else {
                    setProfile(null);
                }
            } catch (err) {
                console.error('Erro no listener de autenticação:', err);
            } finally {
                clearTimeout(safetyTimeout);
                setIsLoading(false);
            }
        });

        return () => {
            clearTimeout(safetyTimeout);
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        try {
            setIsLoading(true);
            await supabase.auth.signOut();
        } catch (error: Omit<Error, "message"> | unknown) {
            // Ignorar silenciosamente os erros de "AbortError: Lock broken", 
            // típicos de concorrência com a subscription ao desmontar componentes
            console.warn('Sessão encerrada (com avisos de concorrência):', error);
        } finally {
            setUser(null);
            setProfile(null);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook customizado para facilitar a tipagem e uso do contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
