import React, { useEffect, useState} from "react";
import Header from "./Header";
import ImageCard from "./ImageCard";

export default function HomePage(){
    const [images, setImages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const limit = 6;
    let n=0;
    const r = require.context(process.env.PUBLIC_URL+'/public/images/', false, /\.(png|jpe?g|svg)$/);
    
    const handleScroll = (e) => {
        // console.log(e.target.documentElement.scrollTop);
        // console.log(e.target.documentElement.scrollHeight);
        if(window.innerHeight+e.target.documentElement.scrollTop+1>=e.target.documentElement.scrollHeight){
        //    console.log('at bottom');
          n+=limit;
          loadImages(r).then(res=>{
            setImages(x=>[...x, ...res]);  
          }) ;
          
        }
      }
    
      async function loadImages(r) {
        setFetching(true)
        let images = [];
        console.log(n)
         for(let i=n;i<n+limit;i++){
            try{ 
            const a = await r.keys()[i];
            await images.push(a.replace('./',''));
            }
            catch(err){
               console.log(err.message); 
               window.removeEventListener('scroll', handleScroll);
            }

         }
         setFetching(false);
         return images;
    }

    
    useEffect(()=>{
        loadImages(r).then(res=>{
            console.log(res)
            setImages(res);
         }) ;
        // console.log(images)
        window.addEventListener('scroll', handleScroll);
    },[]);

    return (
        <div className="home-page" >
           <Header/> 
           <div  className="images-section">
               {
                 images.map((x,i)=>{
                     
                     return(
                         <ImageCard key={i} 
                         image={x}/>
                     )
                 })
               }
               {
                 fetching?<h2>Loading more...</h2>:null 
               }
           </div>
        </div>
    )
}