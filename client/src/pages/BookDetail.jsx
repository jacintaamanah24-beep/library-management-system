
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Unable to find this book.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;

  if (error) return <p>{error}</p>;

  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-detail">
      <Link to="/">← Back to Library</Link>

      <h1>{book.title}</h1>

      <h3>By {book.author}</h3>

      <p>
        <strong>Description:</strong>{' '}
        {book.description || 'No description available.'}
      </p>

      <p>
        <strong>Genre:</strong>{' '}
        {book.genre?.name || 'Unknown'}
      </p>

      <p>
        <strong>Published:</strong>{' '}
        {book.publishedAt
          ? new Date(book.publishedAt).toLocaleDateString()
          : 'Not specified'}
      </p>
    </div>
  );
}

export default BookDetail;
