import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, ShieldAlert, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { supabase } from '../services/supabase';

// Schema Regex para validar se a senha atende regras de complexidade
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = z.object({
    fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    company: z.string().optional(),
    email: z.string().email('Endereço de e-mail inválido'),
    password: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .regex(passwordRegex, 'A senha deve conter uma letra maiúscula, uma minúscula, um número e um caractere especial'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            setError(null);

            // O Supabase irá criar o usuário autenticado e a trigger (criada pelo init.sql)
            // cuidará de criar o `profile` associando o id.
            const { error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                        company: data.company,
                    },
                },
            });

            if (signUpError) {
                if (signUpError.message.includes('already registered')) {
                    setError('Este e-mail já está em uso.');
                } else {
                    setError(signUpError.message);
                }
                return;
            }

            setSuccess(true);

            // Pequeno delay para ler a mensagem de sucesso antes de navegar para o login
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch {
            setError('Ocorreu um erro no servidor. Tente novamente.');
        }
    };

    if (success) {
        return (
            <div className="text-center animate-fade-in flex flex-col items-center gap-4 py-8">
                <CheckCircle size={48} className="text-[var(--accent-green)] mx-auto" />
                <h2 className="text-xl font-semibold">Account Created</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                    Check your email format configuration. If email confirmation is disabled in Supabase, you can login now.
                </p>
                <Button onClick={() => navigate('/login')} variant="outline">
                    Proceed to Login
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="auth-form-header">
                <h2>Register Access</h2>
                <p>Create your personnel account</p>
            </div>

            {error && (
                <div className="auth-error-banner animate-fade-in-up" role="alert">
                    <ShieldAlert size={18} />
                    <span>{error}</span>
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={<User size={18} />}
                    error={errors.fullName?.message}
                    {...register('fullName')}
                />

                <Input
                    label="Company / Organization"
                    type="text"
                    placeholder="CyberSec Corp"
                    icon={<Building size={18} />}
                    error={errors.company?.message}
                    {...register('company')}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@company.com"
                    autoComplete="email"
                    icon={<Mail size={18} />}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Secure Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    icon={<Lock size={18} />}
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    icon={<Lock size={18} />}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />

                <Button
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    className="mt-4"
                >
                    Create Account
                </Button>
            </form>

            <div className="auth-form-footer">
                <p>
                    Already have an account?
                    <Link to="/login">Sign In</Link>
                </p>
            </div>
        </>
    );
}
