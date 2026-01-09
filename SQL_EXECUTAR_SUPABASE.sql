-- ==============================================================================
-- INSTRUÇÕES DE USO
-- ==============================================================================
-- 1. Acesse https://supabase.com/dashboard/project/_/sql
-- 2. Crie uma "New Query"
-- 3. Copie TODO o conteúdo deste arquivo e cole lá
-- 4. Clique em "Run"
-- ==============================================================================

-- 1. CORREÇÃO DE AVATARES (URL + Storage)
alter table profiles add column if not exists avatar_url text;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Removemos policies antigas para evitar duplicidade/erros
drop policy if exists "Users can upload own avatar" on storage.objects;
create policy "Users can upload own avatar" on storage.objects for insert
with check ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

drop policy if exists "Users can update own avatar" on storage.objects;
create policy "Users can update own avatar" on storage.objects for update
using ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

drop policy if exists "Users can delete own avatar" on storage.objects;
create policy "Users can delete own avatar" on storage.objects for delete
using ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

drop policy if exists "Avatars are publicly accessible" on storage.objects;
create policy "Avatars are publicly accessible" on storage.objects for select
using ( bucket_id = 'avatars' );


-- 2. SUPORTE A AVATARES PADRÃO (Gradientes)
alter table profiles add column if not exists avatar_type text default 'upload';
alter table profiles add column if not exists avatar_gradient text;


-- 3. CORREÇÃO DE PERMISSÕES DA COMUNIDADE (Posts sumindo)
alter table community_posts enable row level security;
alter table community_comments enable row level security;
alter table community_likes enable row level security;

-- Policies de Posts
drop policy if exists "Users can insert own posts" on community_posts;
create policy "Users can insert own posts" on community_posts for insert with check (auth.uid() = user_id);

drop policy if exists "Users can view all posts" on community_posts;
create policy "Users can view all posts" on community_posts for select using (true);

drop policy if exists "Users can update own posts" on community_posts;
create policy "Users can update own posts" on community_posts for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own posts" on community_posts;
create policy "Users can delete own posts" on community_posts for delete using (auth.uid() = user_id);

-- Policies de Comentários
drop policy if exists "Users can insert own comments" on community_comments;
create policy "Users can insert own comments" on community_comments for insert with check (auth.uid() = user_id);

drop policy if exists "Users can view all comments" on community_comments;
create policy "Users can view all comments" on community_comments for select using (true);

-- 4. CORREÇÃO DE TIPOS DE POST (Constraints)
do $$ 
begin
  alter table community_posts drop constraint if exists community_posts_type_check;
  alter table community_posts add constraint community_posts_type_check 
    check (type in ('suggestion', 'maintenance', 'notice', 'general', 'complaint'));
exception
  when undefined_table then null;
end $$;
