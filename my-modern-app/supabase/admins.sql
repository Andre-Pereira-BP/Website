-- =============================================================================
-- Website administrators
--
-- 1. Supabase → Authentication → Users → "Add user" → "Create new user":
--    email of the person, a temporary password, and tick "Auto Confirm User".
-- 2. Put the emails below and run this file in Supabase → SQL Editor.
-- 3. The person signs in at /admin and changes the password in
--    "Alterar palavra-passe" (bottom of the side menu).
-- =============================================================================

-- Give admin access (accounts must already exist in Authentication → Users)
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where lower(email) in (
  'nome.apelido@bridgepoint.pt',
  'outro.nome@bridgepoint.pt'
)
on conflict (user_id) do nothing;

-- Who has access (an email missing here means the account was not created in step 1)
select a.email, u.email_confirmed_at is not null as confirmed, u.last_sign_in_at, a.created_at
from public.admin_users a
join auth.users u on u.id = a.user_id
order by a.created_at;

-- Remove access from someone (the account stays, but can no longer use the admin area):
-- delete from public.admin_users where lower(email) = 'nome.apelido@bridgepoint.pt';
