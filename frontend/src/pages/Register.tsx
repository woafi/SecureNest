import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '../components/Input';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data: any) => {
        console.log("Form Submitted:", data);
    };

    const getPasswordStrength = () => {
        if (password?.length === 0) return null;
        if (password?.length < 6) return { text: 'Weak', color: 'bg-red-500' };
        if (password?.length < 10) return { text: 'Fair', color: 'bg-yellow-500' };
        if (password?.length < 14) return { text: 'Good', color: 'bg-blue-500' };
        return { text: 'Strong', color: 'bg-green-500' };
    };

    const strength = getPasswordStrength();


    return (
        <div className="flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card max-w-md w-full p-8"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Start securing your passwords today
                    </p>
                </div>

                {/* {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                        </motion.div>
                    )} */}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Name */}
                    <div className="input-name">
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
                    </div>

                    {/* Email */}
                    <div className="input-email">
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
                    </div>

                    {/* Password */}
                    <div>
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
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[45px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        {strength && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Password strength</span>
                                    <span className={`font-medium ${strength.color === 'bg-green-500' ? 'text-green-600' :
                                        strength.color === 'bg-blue-500' ? 'text-blue-600' :
                                            strength.color === 'bg-yellow-500' ? 'text-yellow-600' :
                                                'text-red-600'
                                        }`}>
                                        {strength.text}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full transition-all ${strength.color}`}
                                        style={{ width: `${(password?.length / 16) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                                <CheckCircle className="absolute right-3 bottom-1.5 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 btn-hover  disabled:hover:scale-100 bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl px-6 py-3 text-base hover:scale-105 cursor-pointer"
                    >
                        <User />
                        {isSubmitting ? "Loading..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-dark-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 transition-colors duration-700">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button
                        // onClick={handleGoogleLogin}
                        // disabled={loading}
                        className="mt-4 w-full btn btn-secondary flex items-center justify-center space-x-2 dark:text-white transition-colors duration-700"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className='cursor-pointer'>Google</span>
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Register
