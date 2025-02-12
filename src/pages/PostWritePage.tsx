import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { fetchApi } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { postFormSchema } from '@/schemas';

const ImagePreviewScroll = ({
    previewImages,
    removeImage,
}: {
    previewImages: string[];
    removeImage: (index: number) => void;
}) => {
    return (
        previewImages.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2 px-1 max-w-full scrollbar-hide">
                {previewImages.map((preview, index) => (
                    <div key={index} className="relative group flex-none">
                        <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        )
    );
};

const PostWriteDiv = () => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof postFormSchema>>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: '',
            content: '',
            images: [],
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const files = Array.from(e.target.files);

        // 파일 크기 및 타입 검증
        const validFiles = files.filter((file) => {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB 제한
                alert('파일 크기는 5MB를 초과할 수 없습니다.');
                return false;
            }
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드 가능합니다.');
                return false;
            }
            return true;
        });

        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });

        setSelectedFiles((prev) => [...prev, ...validFiles]);
    };

    const removeImage = (index: number) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const uploadToPresignedUrls = async (uuids: string[], files: File[]) => {
        try {
            const preSignedUrls = await fetchApi('/storage/uploadUrls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(uuids),
            });

            preSignedUrls.forEach((url: string, index: number) => {
                fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': files[index].type },
                    body: files[index],
                });
            });
        } catch (error) {
            console.error('이미지 업로드 실패 : ', error);
            alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
        try {
            const postData = {
                title: data.title,
                content: data.content,
                images: selectedFiles.map((file, index) => ({
                    fileName: file.name,
                    contentType: file.type,
                    orderNumber: index,
                })),
            };

            const response = await fetchApi('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.uuids?.length > 0) {
                await uploadToPresignedUrls(response.uuids, selectedFiles);
            }

            alert('게시물이 작성되었습니다.');
            navigate('/board');
        } catch (error) {
            console.error('게시물 작성 실패 : ', error);
            alert('게시물 작성에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">새 게시물 작성</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                            <FormItem className="space-y-2">
                                <FormLabel className="text-lg font-medium">이미지</FormLabel>
                                <FormControl>
                                    <div className="space-y-4">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="cursor-pointer"
                                        />
                                        <p className="text-sm text-gray-500">
                                            * 최대 5MB, 이미지 파일만 업로드 가능합니다.
                                        </p>
                                    </div>
                                </FormControl>

                                {/* Image Previews */}
                                {previewImages.length > 0 && (
                                    <ImagePreviewScroll
                                        previewImages={previewImages}
                                        removeImage={removeImage}
                                    />
                                )}
                            </FormItem>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => navigate('/board')}
                            >
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

const PostWritePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <PostWriteDiv />
        </motion.div>
    );
};

export default PostWritePage;
