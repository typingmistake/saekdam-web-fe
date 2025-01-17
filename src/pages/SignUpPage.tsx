import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
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
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const formSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: '아이디는 2글자보다 길어야 합니다.' })
            .max(20, { message: '아이디는 20글자보다는 작아야 합니다.' }),
        password: z
            .string()
            .min(8, { message: '비밀번호는 8글자보다 길어야 합니다.' })
            .max(30, { message: '비밀번호는 30글자보다는 작아야 합니다.' }),
        confirmPassword: z.string().min(8, { message: '비밀번호는 8글자보다 길어야 합니다.' }),
        email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
    });

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
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
            <Card className="w-96 p-8 backdrop-blur-sm bg-white/90 shadow-lg">
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-medium">이메일</FormLabel>
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
                                    <FormLabel className="text-sm font-medium">비밀번호</FormLabel>
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
                                    <FormLabel className="text-sm font-medium">
                                        비밀번호 확인
                                    </FormLabel>
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
        </motion.div>
    );
}

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;
