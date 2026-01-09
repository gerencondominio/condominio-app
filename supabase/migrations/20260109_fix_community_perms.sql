-- Garante RLS ativado
alter table community_posts enable row level security;
alter table community_comments enable row level security;
alter table community_likes enable row level security;

-- Policies para community_posts
drop policy if exists "Users can insert own posts" on community_posts;
create policy "Users can insert own posts" on community_posts
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can view all posts" on community_posts;
create policy "Users can view all posts" on community_posts
  for select using (true);

drop policy if exists "Users can update own posts" on community_posts;
create policy "Users can update own posts" on community_posts
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own posts" on community_posts;
create policy "Users can delete own posts" on community_posts
  for delete using (auth.uid() = user_id);


-- Policies para community_comments
drop policy if exists "Users can insert own comments" on community_comments;
create policy "Users can insert own comments" on community_comments
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can view all comments" on community_comments;
create policy "Users can view all comments" on community_comments
  for select using (true);

-- Reforçar constraint de type
do $$ 
begin
  alter table community_posts drop constraint if exists community_posts_type_check;
  alter table community_posts add constraint community_posts_type_check 
    check (type in ('suggestion', 'maintenance', 'notice', 'general', 'complaint'));
exception
  when undefined_table then null;
end $$;
