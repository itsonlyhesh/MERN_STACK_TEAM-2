import { useEffect, useState } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook, fetchCategories } from '../services/bookService';
import Loader from '../components/Loader';
import '../css/admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Form Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: 'Programming',
    description: '',
    stock: 15,
    coverImage: '',
    isFeatured: false,
    isBestSeller: false,
    isTodayOffer: false
  });

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [bList, cList] = await Promise.all([
        fetchBooks({ search: searchTerm }),
        fetchCategories()
      ]);
      setBooks(bList);
      setCategories(cList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [searchTerm]);

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      price: '',
      category: categories[0]?.name || 'Programming',
      description: '',
      stock: 15,
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop',
      isFeatured: false,
      isBestSeller: false,
      isTodayOffer: false
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      category: book.category || 'Programming',
      description: book.description || '',
      stock: book.stock !== undefined ? book.stock : 10,
      coverImage: book.coverImage || '',
      isFeatured: Boolean(book.isFeatured),
      isBestSeller: Boolean(book.isBestSeller),
      isTodayOffer: Boolean(book.isTodayOffer)
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(prev => prev.filter(b => b._id !== id));
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await updateBook(editingBook._id, formData);
      } else {
        await createBook(formData);
      }
      setShowModal(false);
      loadAdminData();
    } catch (err) {
      alert('Error saving book details');
    }
  };

  return (
    <div className="admin-page">
      <div className="section-header" style={{ textAlign: 'left' }}>
        <h1 className="section-title">Admin Management Panel</h1>
        <p className="section-subtitle">Manage store inventory, categories, orders, and sales metrics</p>
      </div>

      {/* Dashboard Statistics Grid */}
      <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <div className="stat-val">{books.length}</div>
            <div className="stat-label">Total Books Cataloged</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div>
            <div className="stat-val">{categories.length || 10}</div>
            <div className="stat-label">Active Genres</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div>
            <div className="stat-val">$12,450</div>
            <div className="stat-label">Monthly Gross Sales</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div>
            <div className="stat-val">142</div>
            <div className="stat-label">Completed Orders</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Manage Books ({books.length})
        </button>
        <button
          className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Manage Categories ({categories.length})
        </button>
      </div>

      {/* Manage Books View */}
      {activeTab === 'books' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search inventory by title or author..."
              style={{ maxWidth: '350px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleOpenAddModal}>
              + Add New Book
            </button>
          </div>

          {loading ? (
            <Loader text="Loading catalog inventory..." />
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Badges</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b._id || b.title}>
                    <td>
                      <img
                        src={b.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop'}
                        alt={b.title}
                        style={{ width: '40px', height: '54px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ fontWeight: 700, maxWidth: '220px' }}>{b.title}</td>
                    <td>{b.author}</td>
                    <td><span className="badge badge-featured">{b.category}</span></td>
                    <td style={{ fontWeight: 700, color: '#4F46E5' }}>${Number(b.price).toFixed(2)}</td>
                    <td>{b.stock || 10}</td>
                    <td>
                      {b.isTodayOffer && <span className="badge badge-offer" style={{ marginRight: '4px' }}>Offer</span>}
                      {b.isBestSeller && <span className="badge badge-bestseller">Best</span>}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ marginRight: '0.5rem' }}
                        onClick={() => handleOpenEditModal(b)}
                      >
                        Edit ✏️
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ color: '#EF4444', borderColor: '#EF4444' }}
                        onClick={() => handleDelete(b._id)}
                      >
                        Delete 🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Manage Categories View */}
      {activeTab === 'categories' && (
        <div style={{ background: '#FFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '1rem' }}>Active Bookstore Categories</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {categories.map((c) => (
              <div key={c.name} style={{ padding: '1rem', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC' }}>
                <span style={{ fontSize: '1.5rem' }}>{c.icon || '📚'}</span>
                <h4 style={{ marginTop: '0.5rem' }}>{c.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Slug: /{c.slug || c.name.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Modal Overlay */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleFormSubmit} style={{ marginTop: '1.25rem' }}>
              <div className="form-group">
                <label>Book Title *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Author Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Featured</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  />
                  <span>Best Seller</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isTodayOffer}
                    onChange={(e) => setFormData({ ...formData, isTodayOffer: e.target.checked })}
                  />
                  <span>Today's Deal</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingBook ? 'Save Changes' : 'Create Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
