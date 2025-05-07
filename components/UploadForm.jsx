'use client';
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [vagaAtiva, setVagaAtiva] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Selecione um arquivo.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      alert(data.message || 'Upload concluído.');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar o arquivo.');
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-4 space-y-4 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold">Upload de Oferta</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full border rounded p-2"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={vagaAtiva}
          onChange={() => setVagaAtiva(!vagaAtiva)}
        />
        <span>Ativar vaga de emprego</span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>
    </form>
  );
}
