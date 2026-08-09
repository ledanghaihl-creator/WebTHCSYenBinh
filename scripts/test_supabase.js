import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ibzzoctcabqcvazvjjge.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAnon = createClient(supabaseUrl, supabaseKey);
const supabaseService = createClient(supabaseUrl, serviceKey);

async function test() {
  console.log('Testing site_config upsert on Supabase:', supabaseUrl);

  const { data: cfg, error: cfgErr } = await supabaseAnon.from('site_config').select('*').eq('id', 1).maybeSingle();
  console.log('Current site_config:', { data: cfg, error: cfgErr?.message });

  const { data: upData, error: upErr } = await supabaseAnon.from('site_config').upsert({
    id: 1,
    school_name: 'TRƯỜNG THCS YÊN BÌNH',
    governing_body: 'ỦY BAN NHÂN DÂN XÃ YÊN BÌNH - TỈNH LẠNG SƠN',
    slogan: 'HỘI TỤ - KẾT TINH - TỎA SÁNG',
    address: 'Xã Yên Bình - Tỉnh Lạng Sơn',
    phone: '(0205) 3885.6789',
    email: 'thcsyenbinh.huulung@langson.edu.vn',
    logo_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80',
    banner_bg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80',
    updated_at: new Date().toISOString()
  });

  console.log('Anon upsert site_config:', { error: upErr?.message });

  if (upErr) {
    const { data: srvData, error: srvErr } = await supabaseService.from('site_config').upsert({
      id: 1,
      school_name: 'TRƯỜNG THCS YÊN BÌNH',
      governing_body: 'ỦY BAN NHÂN DÂN XÃ YÊN BÌNH - TỈNH LẠNG SƠN',
      slogan: 'HỘI TỤ - KẾT TINH - TỎA SÁNG',
      address: 'Xã Yên Bình - Tỉnh Lạng Sơn',
      phone: '(0205) 3885.6789',
      email: 'thcsyenbinh.huulung@langson.edu.vn',
      logo_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80',
      banner_bg: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80',
      updated_at: new Date().toISOString()
    });
    console.log('Service role upsert site_config:', { error: srvErr?.message });
  }
}

test();
