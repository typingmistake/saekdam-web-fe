import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { fetchApi } from '@/lib/utils';

const formSchema = z.object({
    title: z
        .string()
        .min(5, { message: '제목은 5글자 이상이어야 합니다.' })
        .max(100, { message: '제목은 100글자 이하여야 합니다.' }),
    content: z
        .string()
        .min(20, { message: '내용은 20글자 이상이어야 합니다.' })
        .max(1000, { message: '내용은 1000글자 이하여야 합니다.' }),
});

const PostWritePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await fetchApi('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            navigate('/board');
        } catch (error) {
            console.error('게시물 작성 실패 : ', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">새 게시물 작성</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-lg font-medium">제목</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="제목을 입력하세요"
                                                className="text-lg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-lg font-medium">내용</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="내용을 입력하세요"
                                                className="min-h-[200px] text-lg"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Image Upload - 나중에 추가 */}
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-4">
                            <Button variant="outline" type="button">
                                취소
                            </Button>
                            <Button type="submit">게시물 작성</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default PostWritePage;
