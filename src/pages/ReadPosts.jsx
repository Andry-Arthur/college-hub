import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import './ReadPosts.css';
import loadingGif from '../assets/loading.gif';

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState('newest');
    const [loading, setLoading] = useState(true);

    // READ all post from table
    const fetchPosts = async () => {
        setLoading(true);
        let query = supabase.from('Posts').select();
        if (orderBy === 'newest') {
            query = query.order('created_at', { ascending: false });
        } else if (orderBy === 'popular') {
            query = query.order('upvotes', { ascending: false });
        }
        const { data } = await query;

        // set state of posts
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [props, orderBy]);

    if (loading) {
        return <div className="loading-container"><img src={loadingGif} alt="Loading..." /></div>;
    }

    return (
        <div className="ReadPosts">
            <div className="order-by-section">
                <h3>Order By:</h3>
                <button onClick={() => setOrderBy('newest')}>Newest</button>
                <button onClick={() => setOrderBy('popular')}>Most Popular</button>
            </div>
            {
                posts && posts.length > 0 ?
                    posts.map((post, index) =>
                        <Card key={index} id={post.id} title={post.title} author={post.author} createdAt={post.created_at} upvotes={post.upvotes}/>
                    ) : <h2>{'No Posts Yet. Feel free to create some. 😁'}</h2>
            }
        </div>
    );
};

export default ReadPosts;