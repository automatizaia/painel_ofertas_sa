module.exports = {
  reactStrictMode: true, // Ativa o modo estrito do React, ajuda a identificar problemas no código
  images: {
    domains: ['your-image-domain.com'], // Se você usar imagens externas, adicione os domínios aqui
  },
  env: {
    SUPABASE_URL: https://jlggruubpbywznhdziqc.supabase.co, // Exemplo de variável de ambiente para o Supabase
    SUPABASE_ANON_KEY: peyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ2dydXVicGJ5d3puaGR6aXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzA2NjksImV4cCI6MjA1OTgwNjY2OX0.5dyep3OjnsTn2I1HY8g--u5znYzPyvHvFbBPBR_CAvE, // Outra variável de ambiente para o Supabase
  },
  async redirects() {
    return [
      {
        source: '/old-page', // Redireciona de uma URL antiga
        destination: '/new-page', // Para a nova URL
        permanent: true, // Define como redirecionamento permanente
      },
    ]
  },
}
