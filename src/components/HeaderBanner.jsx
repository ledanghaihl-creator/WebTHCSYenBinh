import React, { useRef } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function HeaderBanner({ siteConfig, user, onSaveSiteConfig }) {
  const config = siteConfig || {};
  const schoolName = config.schoolName || 'TRƯỜNG THCS YÊN BÌNH';
  const governingBody = config.governingBody || 'ỦY BAN NHÂN DÂN XÃ YÊN BÌNH - TỈNH LẠNG SƠN';
  const slogan = config.slogan || 'HỘI TỤ - KẾT TINH - TỎA SÁNG';
  const address = config.address || 'Xã Yên Bình - Tỉnh Lạng Sơn';
  const phone = config.phone || '(0205) 3885.6789';
  
  const logoUrl = config.logoUrl || '/images/school-logo.jpg';
  const bannerImage = config.bannerBg || '/images/school-banner.png';

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const isAdmin = user && (user.role === 'BGH' || user.role === 'ADMIN' || user.username === 'admin');

  const compressAndUpload = (file, maxDim, keyName) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        if (onSaveSiteConfig) {
          onSaveSiteConfig({ ...config, [keyName]: compressed });
        }
      };
      img.onerror = () => {
        if (onSaveSiteConfig) {
          onSaveSiteConfig({ ...config, [keyName]: e.target.result });
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  const bannerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 40, 85, 0.75), rgba(0, 78, 124, 0.82)), url('${bannerImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'relative'
  };

  return (
    <header className="header-banner" style={bannerStyle}>
      {isAdmin && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => bannerInputRef.current && bannerInputRef.current.click()}
            style={{ background: 'rgba(15, 23, 42, 0.85)', color: 'white', border: '1px solid #38bdf8', padding: '5px 10px', borderRadius: '4px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}
            title="Tải ảnh Banner mới từ máy tính"
          >
            <ImageIcon size={14} /> 🖼️ ĐỔI BANNER
          </button>
          <input 
            type="file" 
            ref={bannerInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={(e) => e.target.files?.[0] && compressAndUpload(e.target.files[0], 1400, 'bannerBg')} 
          />
        </div>
      )}

      <div className="header-content">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src={logoUrl} 
            alt="Logo TRƯỜNG THCS YÊN BÌNH" 
            className="school-logo" 
          />
          {isAdmin && (
            <button 
              onClick={() => logoInputRef.current && logoInputRef.current.click()}
              style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#0284c7', color: 'white', border: '2px solid white', borderRadius: '50%', padding: '5px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Đổi Logo Trường THCS Yên Bình"
            >
              <Camera size={14} />
            </button>
          )}
          <input 
            type="file" 
            ref={logoInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={(e) => e.target.files?.[0] && compressAndUpload(e.target.files[0], 400, 'logoUrl')} 
          />
        </div>

        <div className="header-text">
          {governingBody && (
            <div style={{ fontSize: '12px', color: '#e0f2fe', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px', fontWeight: '700', textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
              {governingBody}
            </div>
          )}
          <h1 className="school-title" style={{ fontSize: '28px', textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
            {schoolName}
          </h1>
          <div className="school-slogan" style={{ color: '#fbbf24', textShadow: '1px 1px 4px rgba(0,0,0,0.8)', fontWeight: '800' }}>
            {slogan}
          </div>
          <div className="school-address" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)', color: '#f8fafc', fontWeight: '500' }}>
            📍 Địa chỉ: {address} | 📞 Điện thoại: {phone}
          </div>
        </div>
      </div>
    </header>
  );
}
