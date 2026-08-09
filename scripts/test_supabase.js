import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ibzzoctcabqcvazvjjge.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAnon = createClient(supabaseUrl, supabaseKey);
const supabaseService = createClient(supabaseUrl, serviceKey);

async function test() {
  console.log('Testing Supabase Cloud Connection to:', supabaseUrl);
  
  // Test reading articles
  const { data: art, error: artErr } = await supabaseAnon.from('articles').select('*');
  console.log('Anon fetch articles:', { count: art?.length, error: artErr?.message });

  // Test reading documents
  const { data: doc, error: docErr } = await supabaseAnon.from('documents').select('*');
  console.log('Anon fetch documents:', { count: doc?.length, error: docErr?.message });

  // Test inserting test document with anon
  const { data: insDoc, error: insErr } = await supabaseAnon.from('documents').insert([{
    code: 'TEST-001',
    title: 'Văn bản test kết nối thiết bị',
    category: 'Thông tư BGD&ĐT',
    issue_date: '09/08/2026',
    signer: 'THCS Yên Bình'
  }]);
  console.log('Anon insert test document:', { error: insErr?.message });

  if (insErr) {
    const { data: srvIns, error: srvErr } = await supabaseService.from('documents').insert([{
      code: 'TEST-SRV',
      title: 'Văn bản test Service Role',
      category: 'Thông tư BGD&ĐT',
      issue_date: '09/08/2026',
      signer: 'THCS Yên Bình'
    }]);
    console.log('Service role insert test document:', { error: srvErr?.message });
  }
}

test();
