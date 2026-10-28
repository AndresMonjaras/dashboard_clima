create table if not exists public.clima_ciudades (
  clave text primary key,
  nombre text not null,
  pais text not null,
  latitud numeric(8, 5) not null,
  longitud numeric(8, 5) not null,
  temperatura numeric(5, 2) not null,
  sensacion_termica numeric(5, 2) not null,
  humedad integer not null check (humedad between 0 and 100),
  viento_kmh numeric(6, 2) not null check (viento_kmh >= 0),
  codigo_clima integer not null,
  actualizado_en timestamptz not null
);

alter table public.clima_ciudades enable row level security;

drop policy if exists "Usuarios autenticados pueden leer clima"
  on public.clima_ciudades;

create policy "Usuarios autenticados pueden leer clima"
  on public.clima_ciudades
  for select
  to authenticated
  using (true);
