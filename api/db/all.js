import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ibzzoctcabqcvazvjjge.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienpvY3RjYWJxY3ZhenZqamdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAyMjg3OSwiZXhwIjoyMTAxNTk4ODc5fQ.B9AP63XBmMx6b1DPjj18lblFvSiDHFjCjE37Frouu6U';

const supabaseService = createClient(supabaseUrl, serviceKey);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const [
      { data: articles },
      { data: documents },
      { data: resources },
      { data: videos },
      { data: albums },
      { data: schedules },
      { data: site_config },
      { data: users }
    ] = await Promise.all([
      supabaseService.from('articles').select('*').order('id', { ascending: false }),
      supabaseService.from('documents').select('*').order('id', { ascending: false }),
      supabaseService.from('resources').select('*').order('id', { ascending: false }),
      supabaseService.from('videos').select('*').order('id', { ascending: false }),
      supabaseService.from('albums').select('*').order('id', { ascending: false }),
      supabaseService.from('schedules').select('*').order('id', { ascending: false }),
      supabaseService.from('site_config').select('*').eq('id', 1).maybeSingle(),
      supabaseService.from('users').select('*').order('id', { ascending: false })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        articles: articles || [],
        documents: documents || [],
        resources: resources || [],
        videos: videos || [],
        albums: albums || [],
        schedules: schedules || [],
        siteConfig: site_config || null,
        users: users || []
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
