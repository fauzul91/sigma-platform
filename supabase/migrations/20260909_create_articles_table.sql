-- ==============================================================================
-- MIGRASI DATABASE: TABEL ARTICLES (SISTEM MANAJEMEN ARTIKEL TIPTAP)
-- Platform: SIGMA Platform (SMPN 4 Sumberjambe)
-- Jalankan skrip ini di Supabase SQL Editor (Dashboard Supabase -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. Pastikan ekstensi UUID aktif
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Buat tabel articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    cover_image TEXT,
    content JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    author TEXT DEFAULT 'Tim Redaksi SIGMA',
    category TEXT DEFAULT 'Kesehatan Reproduksi',
    read_time TEXT DEFAULT '3 Menit',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Optimasi Index untuk pembacaan cepat di frontend
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles (slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles (status);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles (created_at DESC);

-- 4. Fungsi & Trigger otomatis untuk memperbarui kolom updated_at saat data di-update
CREATE OR REPLACE FUNCTION public.handle_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_articles_updated_at ON public.articles;
CREATE TRIGGER trigger_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_articles_updated_at();

-- 5. Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Publik (siapapun) dapat membaca artikel yang berstatus 'published'
DROP POLICY IF EXISTS "Public read published articles" ON public.articles;
CREATE POLICY "Public read published articles"
    ON public.articles
    FOR SELECT
    USING (status = 'published');

-- Policy 2: Service Role / Admin backend memiliki akses penuh (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admin full access" ON public.articles;
CREATE POLICY "Admin full access"
    ON public.articles
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Policy 3: Akses baca untuk anon client (misal preview di admin jika menggunakan anon client)
DROP POLICY IF EXISTS "Allow anon read all for review" ON public.articles;
CREATE POLICY "Allow anon read all for review"
    ON public.articles
    FOR SELECT
    USING (true);

-- Policy 4: Anon insert/update/delete diizinkan jika admin app menggunakan client anon berproteksi session cookie
DROP POLICY IF EXISTS "Allow anon manage articles" ON public.articles;
CREATE POLICY "Allow anon manage articles"
    ON public.articles
    FOR ALL
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.articles IS 'Tabel artikel edukasi resmi SIGMA berbasis Rich Text Tiptap JSONB';
