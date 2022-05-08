import React from "react";

export default function ImageCard(props){
    return (
        <div className="image-card">
           <img src={'./images/'+props.image} alt="" />
        </div>
    )
}
