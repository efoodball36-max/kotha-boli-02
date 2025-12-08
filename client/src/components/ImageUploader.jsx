import { useState } from 'react';
import axios from 'axios';

export default function ImageUploader({ apiBase, onUploaded }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append('image', file);
    const res = await axios.post(`${apiBase}/api/uploads/image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setLoading(false);
    onUploaded(res.data.url);
  }

  return (
    <div>
      <label style={{ cursor: 'pointer', color: '#0b5' }}>
        {loading ? 'Uploading...' : 'Upload image'}
        <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }}/>
      </label>
    </div>
  );
}
