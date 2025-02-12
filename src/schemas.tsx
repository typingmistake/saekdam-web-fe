import { z } from 'zod';

export const commentFormSchema = z.object({
    content: z
        .string()
        .min(5, { message: '내용은 5글자 이상이어야 합니다.' })
        .max(100, { message: '내용은 100글자 이하여야 합니다.' }),
});

export const postFormSchema = z.object({
    title: z
        .string()
        .min(5, { message: '제목은 5글자 이상이어야 합니다.' })
        .max(20, { message: '제목은 20글자 이하여야 합니다.' }),
    content: z
        .string()
        .min(10, { message: '내용은 10글자 이상이어야 합니다.' })
        .max(500, { message: '내용은 500글자 이하여야 합니다.' }),
    images: z.array(z.instanceof(File)).optional(),
});

export const loginFormSchema = z.object({
    email: z
        .string()
        .email({ message: '이메일 형식이 아닙니다.' })
        .min(5, { message: '이메일은 5글자 이상이어야 합니다.' })
        .max(50, { message: '이메일은 50글자 이하여야 합니다.' }),
    password: z
        .string()
        .min(8, { message: '비밀번호는 8글자보다 길어야 합니다.' })
        .max(30, { message: '비밀번호는 30글자보다는 작아야 합니다.' }),
});

export const signUpFormSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: '유저이름은 2글자 이상이어야 합니다.' })
            .max(5, { message: '유저이름은 5글자 이하여야 합니다.' }),
        password: z
            .string()
            .min(8, { message: '비밀번호는 8글자보다 길어야 합니다.' })
            .max(20, { message: '비밀번호는 20글자보다는 작아야 합니다.' }),
        confirmPassword: z.string(),
        email: z
            .string()
            .email({ message: '이메일 형식이 아닙니다.' })
            .min(5, { message: '이메일은 5글자 이상이어야 합니다.' })
            .max(50, { message: '이메일은 50글자 이하여야 합니다.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
    });
