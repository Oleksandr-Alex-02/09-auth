'use client';

import { useState } from 'react';
import css from './SignUp.module.css'; // опціонально, якщо є стилі

const SignUp = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (formData: FormData) => {
        const userName = formData.get('userName')?.toString().trim();
        const email = formData.get('email')?.toString().trim();
        const password = formData.get('password')?.toString();

        if (!userName || !email || !password) {
            setStatus('error');
            setMessage('All fields are required.');
            return;
        }

        try {
            setStatus('loading');

            // 🔧 Replace with your actual API call
            const res = await fetch('/api/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify({ userName, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Failed to register');

            setStatus('success');
            setMessage('Registration successful!');
        } catch (err) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className={css.wrapper}>
            <h1>Sign up</h1>

            <form action={handleSubmit} className={css.form}>
                <label>
                    Username
                    <input type="text" name="userName" required />
                </label>

                <label>
                    Email
                    <input type="email" name="email" required />
                </label>

                <label>
                    Password
                    <input type="password" name="password" required />
                </label>

                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Registering...' : 'Register'}
                </button>
            </form>

            {message && <p className={css.message}>{message}</p>}
        </div>
    );
};

export default SignUp;