import {Suspense} from 'react';
import SearchComponent from './page'


const RestaurantSearch = () => (
    <Suspense fallback={<p>ロード中</p>}>
        <SearchComponent />
    </Suspense>
);

export default RestaurantSearch;
