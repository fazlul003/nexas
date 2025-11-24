import React, { useEffect } from 'react';
import { useAppContext } from '../App';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  schema?: object;
}

const Meta: React.FC<MetaProps> = ({ title, description, image, schema }) => {
  const { settings } = useAppContext();
  
  const siteTitle = title ? `${title} | ${settings.siteName}` : settings.siteName;
  const metaDesc = description || settings.homepageHeroSubtext;

  useEffect(() => {
    document.title = siteTitle;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metaDesc);

    // Schema.org Injection
    if (schema) {
      let script = document.getElementById('json-ld-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [siteTitle, metaDesc, schema]);

  return null;
};

export default Meta;