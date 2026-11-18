
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>

      <p>By {book.author}</p>

      <p>
        {book.description || 'No description available.'}
      </p>

      <p>
        Genre: {book.genre?.name || 'Unknown'}
      </p>

      <Link to={`/books/${book.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
