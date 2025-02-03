type shopType = {
    
    id: string;
    name: string;
    address: string;
    logo_image: string;
    access:string;
    genre:{
        name:string
    };
    photo:{
        pc:{
            l :string;
        }
    }
};
export default shopType;
