# Condominio App

Aplicativo Web de Gerenciamento de Condomínio construído com Next.js, Supabase e Tailwind CSS.

## 🚀 Setup do Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com as suas credenciais do Supabase:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_projeto
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🗄️ Integração com Supabase

O schema completo do banco de dados está localizado em: `supabase/schema.sql`.

Para configurar o banco de dados:
1. Acesse o [SQL Editor](https://supabase.com/dashboard/project/_/sql) no seu painel do Supabase.
2. Copie o conteúdo de `supabase/schema.sql`.
3. Cole e execute o script para criar todas as tabelas e políticas de segurança (RLS).

## ☁️ Deploy na Vercel

O projeto está pronto para ser implantado na Vercel.

1. Faça o push do código para o GitHub.
2. Importe o projeto na Vercel.
3. Nas configurações de **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em **Deploy**.

## 🎨 Design System

O projeto utiliza Tailwind CSS v4 para estilização com tema personalizado definido em `src/app/globals.css`.
Componentes reutilizáveis estão em `src/components/ui`.

## 📱 Estrutura de Pastas

- `/app`: Páginas e rotas (App Router)
- `/components`: Componentes React (UI, Dashboard, Community)
- `/lib`: Utilitários e clientes Supabase
- `/supabase`: Scripts SQL
