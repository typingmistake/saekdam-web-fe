import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { fetchApi } from '@/lib/utils';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';
import { loginFormSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginForm() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>): Promise<void> => {
        try {
            const jwt = await fetchApi('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            localStorage.setItem('jwt', jwt);
            alert('로그인이 완료되었습니다.');
            window.location.href = '/';
        } catch (error: unknown) {
            console.error(error);
            alert(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        }
    };

    // 카카오 로그인 버튼 클릭 핸들러
    const handleKakaoLogin = async () => {
        try {
            // 백엔드가 반환한 카카오 로그인 URL (JSON: { loginUrl: "..." })
            const response = await fetchApi('/auth/kakao/login');
            const { loginUrl } = response;
            window.location.href = loginUrl;
        } catch (error) {
            console.error('카카오 로그인 에러:', error);
            alert('카카오 로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <Card className="w-full max-w-96 p-8 backdrop-blur-sm bg-white/90 shadow-lg">
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
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-sm font-medium">이메일</Label>
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
                                    <Label className="text-sm font-medium">비밀번호</Label>
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
                <Link to="/signup" className="text-gray-500 hover:text-primary transition-colors">
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
                {/* GitHub 로그인 버튼 제거 */}
                {/* 카카오 로그인 버튼 추가 */}
                <Button
                    onClick={handleKakaoLogin}
                    className="w-full h-11 bg-yellow-300 hover:bg-yellow-400 transition-colors"
                    variant="default"
                >
                    카카오로 로그인
                </Button>
                <Button
                    className="w-full h-11 bg-red-500 hover:bg-red-600 transition-colors"
                    variant="default"
                >
                    <Chrome className="mr-2 h-5 w-5" /> Google로 로그인
                </Button>
            </div>
        </Card>
    );
}

const LoginPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-center pt-4 bg-gradient-to-b from-gray-50 to-white">
                <LoginForm />
            </div>
        </motion.div>
    );
};

export default LoginPage;
