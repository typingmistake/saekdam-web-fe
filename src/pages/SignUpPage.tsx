import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchApi } from '@/lib/utils';
import { signUpFormSchema } from '@/schemas';

export function SignUpForm() {
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
        try {
            await fetchApi('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Card className="w-full max-w-96 p-8 backdrop-blur-sm bg-white/90 shadow-lg">
            <div className="space-y-2 text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    회원가입
                </h1>
                <p className="text-gray-500">새로운 계정을 만들어보세요</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-sm font-medium">유저이름</Label>
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
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-sm font-medium">이메일</Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
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
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-sm font-medium">비밀번호</Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-sm font-medium">비밀번호 확인</Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full h-11 bg-primary hover:bg-primary/90 transition-colors"
                    >
                        가입하기
                    </Button>
                </form>
            </Form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    이미 계정이 있으신가요?{' '}
                    <Link
                        to="/login"
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        로그인하기
                    </Link>
                </p>
            </div>
        </Card>
    );
}

const SignUpPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-center pt-12 bg-gradient-to-b from-gray-50 to-white">
                <SignUpForm />
            </div>
        </motion.div>
    );
};

export default SignUpPage;
