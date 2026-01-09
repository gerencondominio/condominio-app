-- Add avatar_url column to profiles table
alter table profiles add column if not exists avatar_url text;

-- Create storage bucket for avatars (if not exists)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage policies for avatars

-- Allow authenticated users to upload their own avatar
-- Users can only upload to their own folder (user_id)
create policy "Users can upload own avatar"
on storage.objects for insert
with check (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to update their own avatar
create policy "Users can update own avatar"
on storage.objects for update
using (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own avatar
create policy "Users can delete own avatar"
on storage.objects for delete
using (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to avatars
create policy "Avatars are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' );
