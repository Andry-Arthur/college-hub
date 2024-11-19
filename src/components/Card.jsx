import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'


const Card = (props) =>  {

  const formattedDate = new Date(props.createdAt).toLocaleString();

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <Link to={'/view/' + props.id} className="postLink">
              <h2 className="title">{props.title}</h2>
              <h3 className="author">{"by " + props.author}</h3>
              <p className="createdAt">{"Posted on: " + formattedDate}</p>
              <p className="upvotes">{"Upvotes: " + props.upvotes}</p>
          </Link>
      </div>
  );
};

export default Card;