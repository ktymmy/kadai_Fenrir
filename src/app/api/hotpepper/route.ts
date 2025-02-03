import { NextResponse } from 'next/server';
import API from '@/api';

export async function GET(req: Request) {


    const { searchParams } = new URL(req.url)
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const range = searchParams.get('range');
    const keyword = searchParams.get('keyword');
    const name_any = searchParams.get('name_any');

    const params = new URLSearchParams({
        lat: lat || '',
        lng: lng || '',
        range: range || '',
        keyword: keyword || '',
        name_any: name_any || '',
        count: '50',
        format: 'json',
      });      
    
      //位置情報が取得できているか
    if (!lat || !lng || !range) {
        return NextResponse.json(
            { error: '必須パラメータ(lat, lng, range)が不足しています。' },
            { status: 400 }
        );
    }

    console.log('API呼び出し');
    const apiKey = API.HOTPEPPER_API;
    const apiUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&${params.toString()}`;


    try {
        const response = await fetch(apiUrl);
        
        console.log('fetch完了'+response);

        if (!response.ok) {
            throw new Error(`APIにエラーが出ている: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('検索URL', apiUrl);

        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error('API呼び出しエラー:', error);

        return NextResponse.json(
            { error: 'データの取得に失敗', details: error },
            { status: 500 }
        );
    }
}
