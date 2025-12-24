import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { signup, loginWithGoogle } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data: any) => {
        setError('');
        setLoading(true);
        const { email, password, name } = data;
        try {
            const result: any = await signup(email, password, name);
            if (result) {
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);

        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign up with Google.');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (!password || password?.length === 0) return null;
        if (password?.length < 6) return { text: 'Weak', color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' };
        if (password?.length < 10) return { text: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' };
        if (password?.length < 14) return { text: 'Good', color: 'bg-blue-500', textColor: 'text-blue-600 dark:text-blue-400' };
        return { text: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' };
    };

    const strength = getPasswordStrength();

    return (
        <div className="flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-gray-200 dark:border-slate-700"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Start securing your passwords today
                    </p>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="input-name"
                    >
                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            {...register("name", {
                                required: "The field is required",
                                minLength: { value: 3, message: "Minimum length is 3" },
                                maxLength: { value: 30, message: "Maximum length is 30" },
                            })}
                            icon={<User />}
                            error={errors.name?.message as string}
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="input-email"
                    >
                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            {...register("email", {
                                required: "The field is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            icon={<Mail />}
                            error={errors.email?.message as string}
                            required
                        />
                    </motion.div>

                    {/* Password */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="input-password relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Password must be at least 4 characters",
                                    },
                                })}
                                icon={<FiLock />}
                                error={errors.password?.message as string}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[45px] text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 cursor-pointer"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </motion.button>
                        </div>
                        {strength && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3"
                            >
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">Password strength</span>
                                    <span className={`font-bold ${strength.textColor}`}>
                                        {strength.text}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((password?.length / 16) * 100, 100)}%` }}
                                        transition={{ duration: 0.3 }}
                                        className={`h-2 rounded-full ${strength.color}`}
                                    ></motion.div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <div className="relative">
                            <Input
                                type="password"
                                label="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                placeholder="••••••••"
                                icon={<FiLock />}
                                error={errors.confirmPassword?.message as string}
                            />
                            {confirmPassword && password === confirmPassword && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    className="absolute right-3 bottom-1.5 transform -translate-y-1/2"
                                >
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                <User className="w-5 h-5" />
                                <span>Create Account</span>
                            </>
                        )}
                    </motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                >
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-medium">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleSignup}
                        disabled={loading}
                        className="mt-4 w-full py-3 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 border-2 border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </motion.button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
                >
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors duration-300"
                    >
                        Sign in
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    )
}

export default Register