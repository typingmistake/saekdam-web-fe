import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera } from 'lucide-react';

const MainPage = () => {
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
                    <div className="w-full h-96">
                        <img
                            src="https://news.unist.ac.kr/kor/wp-content/uploads/2016/05/2016-%EA%B3%B5%EC%B4%8C%EB%A7%88%EC%9D%84-%EB%B2%BD%ED%99%94%EB%B4%89%EC%82%AC-1.jpg"
                            alt="Before"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4">AI 분석</h3>
                    <p className="text-gray-600">
                        AI가 벽면의 상태를 분석하여 최적의 디자인을 제안합니다.
                    </p>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4">실시간 미리보기</h3>
                    <p className="text-gray-600">변경될 디자인을 실시간으로 확인할 수 있습니다.</p>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-4">맞춤형 제안</h3>
                    <p className="text-gray-600">
                        공간의 특성에 맞는 다양한 디자인을 제안받을 수 있습니다.
                    </p>
                </Card>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gray-50 rounded-lg p-12">
                <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
                <p className="text-gray-600 mb-8">
                    더 이상 고민하지 마세요. AI와 함께 새로운 공간을 만들어보세요.
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

export default MainPage;
