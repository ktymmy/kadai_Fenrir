// //検索結果の画面

'use client';
import { useRestaurantContext } from '../context/RestaurantContext';
import { useState } from 'react';

const ResultsPage = () => {
    const { restaurants } = useRestaurantContext();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10; 

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

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">レストラン情報</h1>
            <ul className="space-y-4">
                {currentRestaurants.length > 0 ? (
                    currentRestaurants.map((shop) => (
                        <li key={shop.id} className="border-b py-2">
                            <h2 className="text-lg font-bold">{shop.name}</h2>
                            <p className="text-sm text-gray-500">{shop.address}</p>
                        </li>
                    ))
                ) : (
                    <p>データがありません。</p>
                )}
            </ul>

            {/* ページングボタン */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-4 rounded disabled:opacity-50"
                >
                    前へ
                </button>
                <p>{currentPage} / {totalPages}</p>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-4 rounded disabled:opacity-50"
                >
                    次へ
                </button>
            </div>
        </div>
    );
};
export default ResultsPage;