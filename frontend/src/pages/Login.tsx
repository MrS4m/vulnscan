import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ShieldAlert } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { supabase } from '../services/supabase';

const loginSchema = z.object({
    email: z.string().email('Endereço de e-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState<string | null>(null);

    // Se o usuário foi redirecionado para cá, salva a rota de destino
    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setError(null);
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                // Mensagens mais descritivas baseadas no erro
                if (error.message.includes('Invalid login credentials')) {
                    setError('Credenciais inválidas. Verifique seu e-mail e senha.');
                } else {
                    setError(error.message);
                }
                return;
            }

            // Redireciona para onde ele queria ir originalmente, ou '/'
            navigate(from, { replace: true });
        } catch {
            setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
    };

    return (
        <>
            <div className="auth-form-header">
                <h2>System Login</h2>
                <p>Enter your credentials to access the platform</p>
            </div>

            {error && (
                <div className="auth-error-banner animate-fade-in-up" role="alert">
                    <ShieldAlert size={18} />
                    <span>{error}</span>
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="admin@company.com"
                    autoComplete="email"
                    icon={<Mail size={18} />}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    icon={<Lock size={18} />}
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Button
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    className="mt-4"
                >
                    Authenticate
                </Button>
            </form>

            <div className="auth-form-footer">
                <p>
                    Don't have an account?
                    <Link to="/register">Request Access</Link>
                </p>
            </div>
        </>
    );
}
