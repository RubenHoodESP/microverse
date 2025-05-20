'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../services/authApi';
import { setCredentials } from '../model/authSlice';
import LoginForm from './LoginForm';

export default function LoginFormContainer() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      const result = await login(form).unwrap();
      dispatch(setCredentials(result));

      // Opcional: guardar token en localStorage
      localStorage.setItem('token', result.token);

      router.push('/');
    } catch (err) {
      console.error('Login fallido');
      setFormError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <LoginForm
      username={form.username}
      password={form.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={isLoading}
      error={formError ?? undefined}
    />
  );
}
