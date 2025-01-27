// //検索結果の画面

'use client';

import { useRestaurantContext } from '../context/RestaurantContext';

const ResultsPage = () => {
    const { restaurants } = useRestaurantContext();
    
         console.log('result画面結果確認'+restaurants)
    return (
        <div>
            <h1>検索結果</h1>
            <ul>
                <h2>周辺のレストラン:</h2>
            {restaurants.length > 0 ? (
                <ul>
                    {restaurants.map((shop, index) => (
                        <li key={index}>
                            <h3>{shop.name}</h3>
                            <img src={shop.logo_image} alt={shop.name} width={100} />
                            <strong>{shop.midnight}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>レストランが見つかりませんでした。</p>
            )}
            </ul>
        </div>
    );
};
export default ResultsPage;