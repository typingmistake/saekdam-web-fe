import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageCarousel = () => {
    const images = [
        new URL('../assets/wallPainting1.jpeg', import.meta.url).href,
        new URL('../assets/wallPainting2.jpeg', import.meta.url).href,
        new URL('../assets/wallPainting3.jpeg', import.meta.url).href,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // 5초마다 이미지 변경

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex-1 relative">
            <div className="w-full h-96">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                            currentIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 
                ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const MainPageDiv = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                <div className="flex-1 space-y-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r bg-primary bg-clip-text text-transparent">
                        벽을 새롭게,
                        <br />
                        공간을 아름답게
                    </h1>
                    <p className="text-xl text-gray-600">
                        AI가 당신의 공간을 새롭게 변화시켜드립니다.
                        <br />
                        지금 바로 시작해보세요.
                    </p>
                    <br />
                    <Link to="/qr">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 py-3 px-6">
                            <Camera className="mr-2 h-5 w-5" />
                            시작하기
                        </Button>
                    </Link>
                </div>
                <div className="flex-1">
                    <ImageCarousel />
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4">AI 분석</h3>
                    <p className="text-gray-600">AI가 당신의 벽을 탐지하고, 색을 담아드립니다.</p>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4">실시간 미리보기</h3>
                    <p className="text-gray-600">변경될 디자인을 실시간으로 확인할 수 있습니다.</p>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4">맞춤형 제안</h3>
                    <p className="text-gray-600">요구사항에 맞춰 최적의 디자인을 제안합니다.</p>
                </Card>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gray-50 rounded-lg p-12">
                <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
                <p className="text-gray-600 mb-8">
                    당신의 공간을 새롭게 변화시키는 첫 걸음을 내딛어보세요.
                </p>
                <Link to="/board">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                        게시판 구경하기
                    </Button>
                </Link>
            </section>

            {/* Partners Section */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">함께하는 기관(이었으면 좋겠다)</h2>
                        <div className="w-24 h-1 bg-primary"></div>
                    </div>

                    <div className="flex flex-wrap gap-8 items-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/SK_logo.svg"
                                alt="SK Logo"
                                className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/SK_Telecom_Logo.svg"
                                alt="LG Logo"
                                className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
                                alt="Samsung Logo"
                                className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                        {/* 추가 로고들이 들어갈 자리 */}
                    </div>

                    <p className="text-gray-500 mt-8">
                        본 프로젝트는 여러 기관과 함께 잔행 중입니다.
                    </p>
                </div>
            </section>
        </div>
    );
};

const MainPage = () => {
    return (
        <div className="w-[80%] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <MainPageDiv />
            </motion.div>
        </div>
    );
};

export default MainPage;
