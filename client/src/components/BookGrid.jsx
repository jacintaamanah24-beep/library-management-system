
import { useEffect, useState } from 'react';
import api from '../api/axios';
import BookCard from './BookCard';

function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/books', {
          params: {
            search: search || undefined,
            genreId: genreId || undefined,
          },
        });

        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Unable to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, genreId]);

  if (loading) return <p>Loading books...</p>;

  if (error) return <p>{error}</p>;

  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
