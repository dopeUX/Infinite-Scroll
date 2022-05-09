import React, { useEffect, useState } from "react";
import Header from "./Header";
import ImageCard from "./ImageCard";
import {Column, Table} from 'react-virtualized';
import {List, AutoSizer, CellMeasurerCache, CellMeasurer} from 'react-virtualized';


export default function HomePage(){
  const listHeight = 900;
  const rowHeight = 300;
  const rowWidth = 1200;
  const cache = new CellMeasurerCache({
  defaultWidth: 500,
  defaultHeight: 900
});
    const [images, setImages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const limit = 6;
    let n = 0;
    const r = require.context(process.env.PUBLIC_URL+'/public/images/', false, /\.(png|jpe?g|svg)$/);
   
    const Row = ({ index,key, style ,parent}) => {
    //  const img = r.keys()[index].replace('./','');
      let i = 3*index;
      let arr = [];
      for(let j=0;j<3;j++){
       try{ 
       arr.push(r.keys()[i].replace('./',''));
       }catch(err){
         console.log(err.message);
       }
       i++;
      }
      return  <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}>
            {
              
            }
               <div key={key} style={style} className="images-section">
                  {
                    arr.map((x,i)=>{
                      return <ImageCard key={i} image={x}/>
                    })
                  }
                </div>
      </CellMeasurer>
    };
  
    
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
        // console.log(n)
        //  for(let i=n;i<n+limit;i++){
        //     try{ 
        //     const a = await r.keys()[i];
        //     await images.push(a.replace('./',''));
        //     }
        //     catch(err){
        //        console.log(err.message); 
        //        window.removeEventListener('scroll', handleScroll);
        //     }

        //  }
        //  setFetching(false);

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
   const len = r.keys().length%3;
   const l = len===0?r.keys().length/3:parseInt(r.keys().length/3)+1;
    return (
        <div className="home-page" >
           <Header/> 
          <div className="list">
            
           <List
             width={rowWidth}
             height={listHeight}
             rowHeight={rowHeight}
             rowRenderer={Row}
             rowCount={l} />
           </div>
        </div>
    )
}