// 検索画面
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {  useEffect, useState } from 'react';
import { useRestaurantContext } from './context/RestaurantContext';



export default function Search() {
      const router = useRouter();
      const searchParams = useSearchParams();
      const { setRestaurants } = useRestaurantContext();


      //初期値
      const INITIAL_LATITUDE = 0;  
      const INITIAL_LONGITUDE = 0; 
      const [location, setLocation] = useState({ latitude: INITIAL_LATITUDE, longitude: INITIAL_LONGITUDE });


      
      //現在地からの検索半径  
      const INITIAL_RADIUS = 3;  
      const [radius, setRadius] = useState(INITIAL_RADIUS);


      //キーワード
      const keyword = searchParams?.get('keyword') || '';
      const [keywordText, setKeywordText] = useState<string>(keyword);
      const handleKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => setKeywordText(e.target.value);

      //店舗名
      const name_any = searchParams?.get('name_any') || '';
      const [nameAnyText, setNameAnyText] = useState<string>(name_any);
      const handleNameAnyInput = (e: React.ChangeEvent<HTMLInputElement>) => {setNameAnyText(e.target.value);
      console.log(nameAnyText)
    }



    //位置情報の取得
      useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('位置情報の取得失敗: ' + error.message);
                }
            );
        }
      }, );

    const handleSearch = async () =>{
      const params = new URLSearchParams({
        lat: location.latitude.toString(),
        lng: location.longitude.toString(),
        range: radius.toString(),
        keyword: keywordText.trim() || '',  
        name_any: nameAnyText.trim() || '',  
      });
      console.log('Search Params:', params.toString());  


        const response = await fetch(`/api/hotpepper?${params.toString()}`);
        const data = await response.json();
        console.log(data.results.results_available); 

        setRestaurants(data.results.shop)
        router.push('/result');
    }


  

  return (
    <div className="p-5">
    <h1 className="text-xl font-bold mb-4">レストラン検索</h1>

    {/*  */}
    <div className="mb-4">
                <label className="block text-sm font-medium mb-1">現在地からの検索半径を選択</label>
                <select
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="border rounded-md w-full p-2"
                >
                    <option >選択してください</option>
                    <option value="1">300m</option>
                    <option value="2">500m</option>
                    <option value="3">1000m</option>
                    <option value="4">2000m</option>
                    <option value="5">3000m</option>
                </select>
            </div>

    {/* キーワード検索*/}
    <div className="mb-4">
                <label className="block text-sm font-medium mb-1">キーワード検索</label>
                <input
                    type="text"
                    value={keywordText}
                    onChange={handleKeywordInput}
                    placeholder="例: パスタ"
                    className="border w-full p-2 rounded-md"
                />
            </div>
            

    {/* 店舗名検索 */}
    <div className="mb-4">
                <label className="block text-sm font-medium mb-1">店舗名検索</label>
                <input
                    type="text"
                    value={nameAnyText}
                    onChange={handleNameAnyInput}
                    placeholder="店舗名を入力"
                    className="border w-full p-2 rounded-md"
                />
            </div>

             <div className="mb-4">
                 <h2 className="text-sm font-medium">現在地情報</h2>
                <p>緯度: {location.latitude}</p>
                 <p>経度: {location.longitude}</p>
            </div>


            <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                検索
            </button>

    </div>
  
  
    
  )
}