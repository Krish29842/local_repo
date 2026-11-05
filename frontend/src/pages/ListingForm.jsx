import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/useAuth';

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ListingForm() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState('book');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [semester, setSemester] = useState('3');
  const [subject, setSubject] = useState('');
  const [condition, setCondition] = useState('Like new');
  const [salePrice, setSalePrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isSenior = profile?.role === 'senior';

  if (!isSenior) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-ink mb-2">Seniors only</h2>
          <p className="text-soft">Only seniors can list items. Switch accounts to sell or rent.</p>
          <NavLink to="/" className="text-sea font-semibold hover:underline">Browse listings</NavLink>
        </div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim()) {
      setError('Please add a title.');
      return;
    }
    if (!subject.trim()) {
      setError('Please add the subject.');
      return;
    }
    const sale = salePrice === '' ? null : Number(salePrice);
    const rent = rentPrice === '' ? null : Number(rentPrice);
    if ((sale !== null && sale <= 0) || (rent !== null && rent <= 0)) {
      setError('Prices must be greater than 0.');
      return;
    }
    if (sale === null && rent === null) {
      setError('Add at least a sale price or a rent price.');
      return;
    }

    setUploading(true);
    let imageUrl = null;

    try {
      // Upload image to Supabase Storage
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(fileName, image);
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error: insertErr } = await supabase.from('products').insert({
        owner_id: user.id,
        title: title.trim(),
        author: author.trim(),
        category,
        semester: Number(semester),
        subject: subject.trim(),
        sale_price: sale,
        rent_price: rent,
        condition,
        image_url: imageUrl,
        status: 'available',
      });
      if (insertErr) throw insertErr;

      setSuccess('Listing created! It will appear for juniors to browse.');
      setUploading(false);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to create listing.');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-5 text-ink">
      <nav className="border-b border-sand-2 bg-white px-6 py-4">
        <NavLink to="/" end className="flex items-center gap-2 text-sea font-semibold hover:underline">
          ← Browse
        </NavLink>
      </nav>

      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">List an item</h1>
        <p className="text-soft mb-8">Sell it, rent it for a semester — or both.</p>

        {error && <p className="mb-4 text-sm text-red-700 font-semibold" role="alert">{error}</p>}
        {success && <p className="mb-4 text-sm text-emerald-700 font-semibold">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none cursor-pointer"
              >
                <option value="book">Book</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Data Structures using C"
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Reema Thareja"
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Data Structures"
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none cursor-pointer"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={String(s)}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none cursor-pointer"
              >
                <option>Like new</option>
                <option>Good</option>
                <option>Some wear</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Sale price (₹)</label>
              <input
                type="number"
                min="1"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="250"
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Rent / month (₹)</label>
              <input
                type="number"
                min="1"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                placeholder="40"
                className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-soft mb-1">Note for juniors (optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Highlighted chapters, solved exercises…"
              className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-soft mb-1">Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-soft file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sea file:text-white hover:file:bg-sea-hover transition-colors cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-xl object-cover border border-sand-2" />
              </div>
            )}
          </div>

          <p className="text-xs text-soft -mt-2">
            Add at least one price — one listing can offer both sale and rent.
          </p>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-ink hover:bg-sea text-sand-4 hover:text-white py-3 rounded-3xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Creating…' : 'Create listing'}
          </button>
        </form>
      </main>
    </div>
  );
}
