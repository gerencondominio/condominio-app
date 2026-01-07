-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- CONDOMINIUMS Table
create table condominiums (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique not null, 
  created_at timestamp with time zone default now()
);

-- PROFILES Table (Extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  cpf text,
  lot_number text,
  condominium_id uuid references condominiums(id),
  birth_date date,
  created_at timestamp with time zone default now()
);

-- PAYMENTS Table (General History)
create table payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  amount numeric not null,
  status text check (status in ('paid', 'pending', 'failed')) default 'pending',
  payment_date timestamp with time zone,
  description text,
  created_at timestamp with time zone default now()
);

-- INVOICES Table (Monthly Bills)
create table invoices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  month_reference date not null, -- e.g. 2023-10-01
  due_date date not null,
  total_amount numeric not null,
  status text check (status in ('paid', 'pending', 'overdue')) default 'pending',
  items jsonb, -- Array of items { description: string, value: number }
  pdf_url text,
  barcode text,
  created_at timestamp with time zone default now()
);

-- COMMUNITY POSTS
create table community_posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  content text not null,
  type text check (type in ('suggestion', 'maintenance', 'notice', 'general')) default 'general',
  is_admin_post boolean default false,
  likes_count int default 0,
  created_at timestamp with time zone default now()
);

-- COMMUNITY COMMENTS
create table community_comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references community_posts(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- NOTIFICATIONS
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  title text not null,
  message text not null,
  type text check (type in ('financial', 'community', 'admin', 'system')) default 'system',
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- PAYMENT METHODS (Mocked/Tokenized)
create table payment_methods (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  card_last4 text not null,
  card_brand text not null,
  expiry_date text,
  is_default boolean default false,
  created_at timestamp with time zone default now()
);

-- RLS POLICIES
alter table profiles enable row level security;
alter table payments enable row level security;
alter table invoices enable row level security;
alter table community_posts enable row level security;
alter table community_comments enable row level security;
alter table notifications enable row level security;
alter table payment_methods enable row level security;

-- Profiles: Users can read their own profile.
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Invoices: Users can view own invoices.
create policy "Users can view own invoices" on invoices
  for select using (auth.uid() = user_id);

-- Posts: Everyone can read. Auth users can insert.
create policy "Public view posts" on community_posts
  for select using (true);
create policy "Authenticated create posts" on community_posts
  for insert with check (auth.uid() = user_id);

-- Notifications: Users can view own.
create policy "Users can view own notifications" on notifications
  for select using (auth.uid() = user_id);
