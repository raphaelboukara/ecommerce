import { stripe } from '@/lib/stripe';
import { Product } from './types';

const internalProducts: Product[] = [
  {
    id: '1',
    slug: 'carafe_a_vin_sophistiquee_en_verre',
    images: [
      '/images/carafe_a_vin_sophistiquee_en_verre/1.jpg',
      '/images/carafe_a_vin_sophistiquee_en_verre/2.jpg',
      '/images/carafe_a_vin_sophistiquee_en_verre/3.png',
    ],
    name: 'Carafe à Vin Sophistiquée en Verre',
    price: 28990,
    keywords: ['alcool', 'vin', 'carafe'],
    description: `
Découvrez l'élégance intemporelle de notre carafe à vin sophistiquée en verre, conçue pour sublimer votre expérience de dégustation. Alliant esthétique et fonctionnalité, cette carafe est le complément parfait pour les amateurs de vin et les connaisseurs exigeants.

### Caractéristiques
- Matériau: Verre de haute qualité, offrant une transparence et une clarté exceptionnelles.
- Capacité: Grande capacité, idéale pour décanter une bouteille entière de vin.
- Design: Silhouette élégante et moderne, avec une base large et un col effilé pour une aération optimale.
- Finition: Soufflée à la main par des artisans expérimentés, chaque carafe est une œuvre d'art unique.
- Ergonomie: Poignée ergonomique intégrée pour une prise en main confortable et un service facile.

### Avantages
- Aération Optimale: La forme de la carafe permet au vin de respirer, libérant ainsi ses arômes et saveurs complexes.
- Esthétique: Un design sophistiqué qui ajoute une touche de luxe à toute table de dîner ou bar à domicile.
- Qualité Supérieure: Fabriquée en verre épais, cette carafe est à la fois robuste et élégante, assurant une longue durée de vie.
- Artisanat Unique: Chaque carafe est soigneusement soufflée à la main, garantissant une qualité et une finition impeccables.

Cette carafe à vin sophistiquée en verre est l'accessoire idéal pour les dégustations de vins, les dîners élégants ou comme cadeau raffiné pour les amateurs de vin.

Offrez-vous ou à vos proches une expérience de dégustation incomparable avec cette carafe d'exception, et transformez chaque moment en une célébration de la finesse et de l'art de vivre.
    `,
  },
  {
    id: '2',
    slug: 'boule_de_billard_authentique',
    images: [
      '/images/boule_de_billard_authentique/1.jpg',
      '/images/boule_de_billard_authentique/2.jpg',
      '/images/boule_de_billard_authentique/3.jpg',
      '/images/boule_de_billard_authentique/4.jpg',
      '/images/boule_de_billard_authentique/5.jpg',
      '/images/boule_de_billard_authentique/6.jpg',
    ],
    name: 'Boule de Billard Authentique',
    price: 37990,
    keywords: ['jeux', 'billard', 'boule', 'pont', 'craies'],
    description: `
Découvrez l'authenticité et la qualité avec nos boules de billard véritable, un élément essentiel pour tout amateur de billard. Fabriquée à partir de résine de haute qualité, cette boule offre une précision de jeu optimale et une durabilité exceptionnelle.

### Caractéristiques
  - Matériau: Résine de haute qualité pour une résistance maximale aux chocs et aux rayures.
  - Taille: Standard de 57,2 mm, conforme aux normes internationales.
  - Couleur:  Disponible dans une variété de couleurs standards (par exemple, noir, blanc, rouge, etc.) pour correspondre à votre table de billard.
  - Finition: Brillante et lisse, assurant un roulement précis sur le tapis de billard.
  - Utilisation: Idéale pour le jeu de billard professionnel ou amateur.

### Avantages :
  - Précision de Jeu:  Conception soignée pour des mouvements fluides et précis sur la table.
  - Durabilité: Résistante aux impacts et à l'usure, conçue pour une utilisation à long terme.
  - Polyvalence:  Convient à différents types de jeux de billard (8-ball, 9-ball, etc.).
  - Esthétique:  Ajoute une touche de professionnalisme à votre table de billard à la maison ou dans un espace de jeu.
Que ce soit pour remplacer une boule de billard usée ou pour améliorer votre expérience de jeu, notre boule de billard véritable est un choix fiable qui répond aux normes les plus élevées en matière de qualité et de performance.

Profitez de notre pont pour queue de billard et de nos craies pour queue de billard offert avec l’article.
    `,
  },
  {
    id: '3',
    slug: 'test',
    images: [
      '/images/test/1.png',
      '/images/test/2.webp',
      '/images/test/3.png',
    ],
    name: 'Magnifique Test',
    price: 100,
    keywords: ['test'],
    description: `
Découvrez l'élégance intemporelle de notre test.

### Caractéristiques
- Matériau: Test de haute qualité.

### Avantages
- Prix Dérisoire: Un tarif surprenant.
    `,
  }
];

export const getProducts = async (): Promise<Product[]> => {
  const stripeProducts: Product[] = [];

  const { data } = await stripe.products.list();
  for (const product of data) {
    stripeProducts.push({
      id: product.id,
      slug: product.metadata.slug,
      images: product.metadata.images
        .split(',')
        .map((imageName) => `/images/${product.metadata.slug}/${imageName}`),
      name: product.metadata.name,
      keywords: [],
      price: parseInt(product.metadata.price, 10),
      description: product.metadata.description
    })
  }

  const products = [
    ...internalProducts,
    ...stripeProducts
  ];

  return products;
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | undefined> =>
  getProducts().then((products) => products.find((p) => p.slug === slug));
