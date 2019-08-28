// @view
import React from 'react';
export const  Card =props=>(
    <div className="card">
         <figure>
            <img src={props.giphy.images.fixed_height.url} />
        </figure>
    </div>
)