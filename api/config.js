import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ibzzoctcabqcvazvjjge.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienpvY3RjYWJxY3ZhenZqamdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAyMjg3OSwiZXhwIjoyMTAxNTk4ODc5fQ.B9AP63XBmMx6b1DPjj18lblFvSiDHFjCjE37Frouu6U';

const supabaseService = createClient(supabaseUrl, serviceKey);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabaseService.from('site_config').select('*').eq('id', 1).maybeSingle();
      if (!error && data) {
        return res.status(200).json({ success: true, data });
      }
      return res.status(200).json({ success: false, message: 'Chưa có dữ liệu site_config' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { schoolName, governingBody, slogan, address, phone, email, logoUrl, bannerBg } = req.body;

      const { data, error } = await supabaseService.from('site_config').upsert({
        id: 1,
        school_name: schoolName,
        governing_body: governingBody,
        slogan: slogan,
        address: address,
        phone: phone,
        email: email,
        logo_url: logoUrl,
        banner_bg: bannerBg,
        updated_at: new Date().toISOString()
      });

      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

      return res.status(200).json({ success: true, message: 'Đã lưu site_config lên Supabase Cloud!' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
