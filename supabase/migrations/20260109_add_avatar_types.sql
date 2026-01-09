-- Add avatar customization columns
alter table profiles add column if not exists avatar_type text default 'upload'; -- values: 'upload', 'gradient'
alter table profiles add column if not exists avatar_gradient text;
