import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name || !date) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const { data, error } = await supabase
        .storage
        .from('ofertas')
        .upload(`ofertas/${file.name}`, file);
      
      if (error) {
        alert('Erro ao enviar arquivo!');
        return;
      }

      const { publicURL, error: urlError } = supabase
        .storage
        .from('ofertas')
        .getPublicUrl(`ofertas/${file.name}`);
      
      if (urlError) {
        alert('Erro ao gerar URL do arquivo!');
        return;
      }

      const { error: dbError } = await supabase
        .from('ofertas')
        .insert([
          {
            name,
            date,
            arquivo_url: publicURL
          }
        ]);

      if (dbError) {
        alert('Erro ao salvar oferta no banco!');
      } else {
        alert('Oferta cadastrada com sucesso!');
      }
    } catch (error) {
      console.error("Erro ao enviar oferta:", error);
      alert('Erro ao processar sua oferta.');
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Ofertas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Oferta</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Data da Oferta</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Arquivo da Oferta</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Cadastrar Oferta</button>
      </form>
    </div>
  );
}
