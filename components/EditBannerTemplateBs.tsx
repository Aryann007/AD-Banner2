import { useState } from 'react';
import styles from './EditBannerTemplateBs.module.css';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  imageAttribution?: string;
}

interface EditBannerProps {
  banner: Banner;
  onSave: (banner: Banner) => void;
  onClose: () => void;
}

export default function EditBannerTemplateBs({ banner, onSave, onClose }: EditBannerProps) {
  const [editedBanner, setEditedBanner] = useState<Banner>(banner);
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBanner(prevBanner => ({
      ...prevBanner,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImage(reader.result);
          setEditedBanner(prevBanner => ({
            ...prevBanner,
            image: URL.createObjectURL(file)
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editedBanner);
  };

  const handleDownload = () => {
    fetch(editedBanner.image)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `banner_${editedBanner.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Download error:', error);
      });
  };

  const backgroundTemplate = `url(${editedBanner.background})`;

  return (
    <div className={styles.editBanner}>
      <header className={styles.header}>
        <h2>Edit Banner</h2>
        <button onClick={onClose} className={styles.closeButton}>×</button>
      </header>
      
      <div className={styles.previewArea}>
        <div className={styles.banner} style={{ backgroundImage: backgroundTemplate }}>
          <div className={styles.imageContainer}>
            <img src={newImage || editedBanner.image} alt="Banner Preview" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{editedBanner.title}</h2>
            <p className={styles.description}>{editedBanner.description}</p>
            <button className={styles.cta}>{editedBanner.cta}</button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="file"
          name="image"
          onChange={handleImageUpload}
          className={styles.input}
        />
        <input 
          type="text"
          name="imageAttribution"
          value={editedBanner.imageAttribution || ''}
          onChange={handleChange}
          placeholder="Image Attribution"
          className={styles.input}
        />
        <input 
          type="text"
          name="title"
          value={editedBanner.title}
          onChange={handleChange}
          placeholder="Title"
          className={styles.input}
        />
        <textarea 
          name="description"
          value={editedBanner.description}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textarea}
        />
        <input 
          type="text"
          name="cta"
          value={editedBanner.cta}
          onChange={handleChange}
          placeholder="CTA"
          className={styles.input}
        />
        
        <button type="submit" className={styles.doneButton}>Done</button>
      </form>
      
      <button onClick={handleDownload} className={styles.downloadButton}>Download</button>
    </div>
  );
}
