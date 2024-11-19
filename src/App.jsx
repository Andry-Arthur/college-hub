import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ViewPost from './pages/ViewPost'
import SearchResults from './pages/SearchResults'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const posts = []
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    window.location.href = `/search?query=${searchQuery}`;
  };

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path: "/new",
      element: <CreatePost />
    },
    {
      path: "/view/:id",
      element: <ViewPost data={posts} />
    },
    {
      path: "/search",
      element: <SearchResults data={posts} query={new URLSearchParams(window.location.search).get('query')} />
    }
  ]);

  return (
    <div className='App'>
      <div className="header">
        <h2>College Hub</h2>
        <Link to="/"><button className="headerBtn"> Home </button></Link>
        <form onSubmit={handleSearch} className='searchForm'>
          <input 
            type="text" 
            name="search"
            placeholder="Search..." 
            className="searchBar" 
          />
          <button type="submit" className="headerBtn"> Search </button>
        </form>
        <Link to="/new"><button className="headerBtn"> Create New Post </button></Link>
      </div>
      
      {element}
    </div>
  )
}

export default App
