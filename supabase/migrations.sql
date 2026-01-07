-- Add Likes table
create table community_likes (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references community_posts(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  created_at timestamp with time zone default now(),
  unique(post_id, user_id)
);

-- Policies for Likes
alter table community_likes enable row level security;

create policy "Users can view likes" on community_likes
  for select using (true);

create policy "Users can like posts" on community_likes
  for insert with check (auth.uid() = user_id);

create policy "Users can unlike posts" on community_likes
  for delete using (auth.uid() = user_id);

-- Add Improvements table if missing (based on previous files)
create table improvements (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    amount numeric not null default 0,
    current_amount numeric not null default 0,
    status text check (status in ('Aprovado', 'Em análise', 'Planejado', 'Fila')) default 'Em análise',
    icon text default 'wrench',
    created_at timestamp with time zone default now()
);

alter table improvements enable row level security;
create policy "Everyone can view improvements" on improvements for select using (true);
-- Add admin policies as needed
