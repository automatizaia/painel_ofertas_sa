import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

// Evita o bodyParser padrão do Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ou uma key com permissão de escrita
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao processar o formulário.' });
    }

    const file = files.file;
    const vagaAtiva = fields.vagaAtiva === 'true';

    const filePath = file.filepath;
    const fileName = file.originalFilename;

    const fileBuffer = fs.readFileSync(filePath);

    const { data, error: uploadError } = await supabase.storage
      .from('ofertas')
      .upload(`catalogos/${fileName}`, fileBuffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error(uploadError);
      return res.status(500).json({ message: 'Erro ao fazer upload.' });
    }

    const publicUrl = supabase.storage
      .from('ofertas')
      .getPublicUrl(`catalogos/${fileName}`).data.publicUrl;

    const { error: insertError } = await supabase
      .from('ofertas')
      .insert([{ arquivo_url: publicUrl, vaga_ativa: vagaAtiva }]);

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ message: 'Erro ao salvar no banco.' });
    }

    return res.status(200).json({ message: 'Upload realizado com sucesso!' });
  });
}
