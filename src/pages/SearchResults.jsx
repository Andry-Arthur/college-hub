import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../client';
import './SearchResults.css'; // Assuming you have a CSS file for styling
import Card from '../components/Card';
import loadingGif from '../assets/loading.gif';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .ilike('title', `%${query}%`);
        
        if (error) {
          throw error;
        }

        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  if (loading) {
    return <div className="loading-container"><img src={loadingGif} alt="Loading..." /></div>;
  }

  return (
    <div>
        <h2>Search Results</h2>
        <div className="posts-container">
            {
                filteredPosts && filteredPosts.length > 0 ?
                    filteredPosts.map((post, index) =>
                        <Card key={index} id={post.id} title={post.title} author={post.author} createdAt={post.created_at} upvotes={post.upvotes} />
                    ) : <h2>{'No Posts Found.'}</h2>
            }
        </div>
    </div>
  );
}

export default SearchResults;