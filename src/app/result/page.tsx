'use client';
import { useRestaurantContext } from '../context/RestaurantContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ResultsPage = () => {
    const router = useRouter();
    const { restaurants } = useRestaurantContext();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5; 

    const totalPages = Math.ceil(restaurants.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentRestaurants = restaurants.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleClick = (id: string) => {
        router.push(`/result/${id}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="bg-sub1 text-white p-4 rounded-md mb-6">
                <h1 className="text-3xl font-bold">レストラン情報</h1>
            </header>

            {/* 結果の表示 */}
            <ul className="space-y-6">
                {currentRestaurants.length > 0 ? (
                    currentRestaurants.map((shop) => (
                        <li
                            key={shop.id}
                            onClick={() => handleClick(shop.id)}
                            className="flex items-center border-b py-4 hover:bg-gray-100 transition cursor-pointer"
                        >
                            <img
                                src={shop.logo_image}
                                alt={shop.name}
                                width={50}
                                className="mr-4 rounded-md"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-sub1">{shop.name}</h2>
                                <p className="text-sm text-gray-500">{shop.access}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">データがありません。</p>
                )}
            </ul>

            {/* ページネーションボタン */}
            {totalPages > 1 && (
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-sub1 hover:bg-sub0 text-white py-2 px-4 rounded-md disabled:opacity-50"
                    >
                        前へ
                    </button>
                    <p className="text-lg">
                        {currentPage} / {totalPages}
                    </p>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-sub1 hover:bg-sub0 text-white py-2 px-4 rounded-md disabled:opacity-50"
                    >
                        次へ
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
