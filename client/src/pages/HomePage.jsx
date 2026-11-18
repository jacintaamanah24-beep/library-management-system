
import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  return (
    <div className="home-page">
      <h1>My Library</h1>
      <p>Discover and explore our collection of books.</p>

      <SearchBar onSearch={handleSearch} />

      <select
        value={genreId}
        onChange={(e) => setGenreId(e.target.value)}
      >
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <BookGrid search={search} genreId={genreId} />
    </div>
  );
}

export default HomePage;
