import { db } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const tattooProducts = [
  { title: 'Healing Balm', price: 25.00, category: 'tattoos', description: 'Bálsamo curativo especializado para la regeneración rápida de la piel tatuada.' },
  { title: 'Antibacterial Soap', price: 15.00, category: 'tattoos', description: 'Jabón neutro sin perfume, ideal para mantener la zona del tatuaje limpia.' },
  { title: 'Premium Ink Set', price: 85.00, category: 'tattoos', description: 'Set de tintas negras intensas de uso profesional.' },
];

const piercingProducts = [
  { title: 'Saline Spray', price: 12.00, category: 'piercings', description: 'Spray de solución salina estéril para limpiar perforaciones nuevas.' },
  { title: 'Titanium Ring', price: 35.00, category: 'piercings', description: 'Aro de titanio grado implante, hipoalergénico y seguro.' },
];

const artists = [
  { name: 'Marcus Aurelio', specialty: 'Black & Grey Realism', bio: 'Maestro del detalle con 15 años de experiencia.', rating: 5 },
  { name: 'Elena Vence', specialty: 'Fine Line & Floral', bio: 'Especialista en trazos delicados y composición botánica.', rating: 4.8 },
];

export const seedDatabase = async () => {
  try {
    console.log("Starting seed...");
    
    // Seed Products
    const productsRef = collection(db, 'products');
    for (const p of [...tattooProducts, ...piercingProducts]) {
      await addDoc(productsRef, p);
    }

    // Seed Artists
    const artistsRef = collection(db, 'artists');
    for (const a of artists) {
      await addDoc(artistsRef, a);
    }

    console.log("Seed completed successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
};
