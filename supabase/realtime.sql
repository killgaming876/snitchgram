alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.likes;
alter publication supabase_realtime add table public.follows;
alter publication supabase_realtime add table public.story_views;

insert into storage.buckets (id,name,public) values ('avatars','avatars',true) on conflict (id) do nothing;
insert into storage.buckets (id,name,public) values ('media','media',true) on conflict (id) do nothing;

create policy "public media read" on storage.objects for select using (bucket_id in ('avatars','media'));
create policy "authenticated media upload" on storage.objects for insert to authenticated with check (bucket_id in ('avatars','media') and auth.uid()::text = (storage.foldername(name))[1]);
create policy "owner media update" on storage.objects for update to authenticated using (bucket_id in ('avatars','media') and auth.uid()::text = (storage.foldername(name))[1]);
create policy "owner media delete" on storage.objects for delete to authenticated using (bucket_id in ('avatars','media') and auth.uid()::text = (storage.foldername(name))[1]);
