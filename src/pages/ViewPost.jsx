import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react';
import { supabase } from '../client';
import './ViewPost.css';
import loadingGif from '../assets/loading.gif';

function ViewPost({ data }) {
  const { id } = useParams()
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Find the post with the given id
  const fetchPostandComments = async () => {
    setLoading(true);
    const { data: postData } = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single();

    const { data: commentsData } = await supabase
        .from('Comments')
        .select()
        .eq('post_id', id);

    const data = { ...postData, comments: commentsData };

    // set state of posts
    setPost(data);
    setLoading(false);
};

const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await supabase
        .from('Comments')
        .insert([{ post_id: id, comment }]);
    setComment("");
    fetchPostandComments(); // Refresh comments
};

const updateCount = async () => {
    if (!hasUpvoted) {
      setCount((count) => count + 1);
      setHasUpvoted(true);

      // Update the upvote count in the database
      await supabase
        .from('Posts')
        .update({ upvotes: count + 1 })
        .eq('id', id);
    }
}

useEffect(() => {
    fetchPostandComments();
}, [id]);

useEffect(() => {
    if (post.upvotes) {
      setCount(post.upvotes);
    }
}, [post]);

  if (loading) {
    return <div className="loading-container"><img src={loadingGif} alt="Loading..." /></div>;
  }

  if (!post) {
    return <div>Post not found</div>
  }

return (
    <div className="ViewPost">
        <h2>{post.title}</h2>
        <p>Author: {post.author}</p>
        <p>{post.description}</p>
        <button className="upvoteButton" onClick={updateCount} disabled={hasUpvoted}>👍 Upvotes: {count}</button>
        <div className="comments">
            <h3>Comments</h3>
            {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.comment}</p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
        
        <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Write a comment..." 
                required 
            />
            <button type="submit">Submit Comment</button>
        </form>
    </div>
)
}

export default ViewPost