import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { useState } from 'react';
import './EditPost.css'
import loadingGif from '../assets/loading.gif';

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            // Fetch the post data here
            const { data: postData } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single();
            setPost(postData);
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .update({title: post.title, author: post.author, description: post.description})
          .eq('id', id);
      
        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', id); 
      
        window.location = "http://localhost:5173/";
    }

    if (loading) {
        return <div className="loading-container"><img src={loadingGif} alt="Loading..." /></div>;
    }

    return (
        <div className='editPost centered'>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost