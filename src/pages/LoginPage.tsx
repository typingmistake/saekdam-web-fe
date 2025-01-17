import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Chrome } from 'lucide-react';

const formSchema = z.object({
    username: z
        .string()
        .min(2, { message: '아이디는 2글자보다 길어야 합니다.' })
        .max(20, { message: '아이디는 20글자보다는 작아야 합니다.' }),
    password: z
        .string()
        .min(8, { message: '비밀번호는 8글자보다 길어야 합니다.' })
        .max(30, { message: '비밀번호는 30글자보다는 작아야 합니다.' }),
});

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-[420px] p-8 backdrop-blur-sm bg-white/90 shadow-lg">
                <div className="space-y-2 text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        로그인
                    </h1>
                    <p className="text-gray-500">환영합니다</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-medium">아이디</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => {
                                const [showPassword, setShowPassword] = useState(false);
                                return (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="text-sm font-medium">
                                            비밀번호
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...field}
                                                    className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors pr-10"
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={20} />
                                                ) : (
                                                    <Eye size={20} />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <Button
                            type="submit"
                            className="w-full h-11 bg-primary hover:bg-primary/90 transition-colors"
                        >
                            로그인
                        </Button>
                    </form>
                </Form>

                <div className="flex justify-between mt-4 text-sm">
                    <Link
                        to="/find-password"
                        className="text-gray-500 hover:text-primary transition-colors"
                    >
                        비밀번호 찾기
                    </Link>
                    <Link
                        to="/signup"
                        className="text-gray-500 hover:text-primary transition-colors"
                    >
                        회원가입
                    </Link>
                </div>

                <div className="relative my-8">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                        또는
                    </span>
                </div>

                <div className="space-y-3">
                    <Button
                        className="w-full h-11 bg-gray-900 hover:bg-gray-800 transition-colors"
                        variant="default"
                    >
                        <Github className="mr-2 h-5 w-5" /> GitHub로 로그인
                    </Button>
                    <Button
                        className="w-full h-11 bg-red-500 hover:bg-red-600 transition-colors"
                        variant="default"
                    >
                        <Chrome className="mr-2 h-5 w-5" /> Google로 로그인
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
}

const LoginPage = () => {
    return (
        <div className="min-h-screen flex justify-center p-6 bg-gradient-to-b from-gray-50 to-whit">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
