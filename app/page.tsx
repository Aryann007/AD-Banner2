'use client'

import { useState } from 'react';
import BannerImageComp from '../components/BannerImageComp';
import EditBannerTemplateBs from '../components/EditBannerTemplateBs';
import bannerData from '../data/bannerData.json';
import styles from './page.module.css';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  imageAttribution?: string;
}

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>(bannerData);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
  };

  const handleSave = (updatedBanner: Banner) => {
    setBanners(banners.map(b => b.id === updatedBanner.id ? updatedBanner : b));
    setEditingBanner(null);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>AD BANNERS</h1>
      <div className={styles.bannerGrid}>
        {banners.map(banner => (
          <div className={styles.bannerWrapper} key={banner.id}>
            <BannerImageComp banner={banner} onEdit={() => handleEdit(banner)} />
          </div>
        ))}
      </div>
      {editingBanner && (
        <EditBannerTemplateBs 
          banner={editingBanner} 
          onSave={handleSave} 
          onClose={() => setEditingBanner(null)} 
        />
      )}
    </main>
  );
}