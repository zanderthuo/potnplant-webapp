import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";

export type ProductCategory =
  | "Indoor Potted Plants"
  | "Outdoor Potted Plants"
  | "Plant Stands"
  | "Compost Soil"
  | "Gardening Tools";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory | string;
  price: number;
  newPrice?: number;
  oldPrice?: number;
  compareAt?: number;
  tag?: "SALE" | "HOT" | "NEW";
  image: string;
  stock: number;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Echeveria Blue Succulent - White Planter Very Small Pot Size",
    category: "Indoor Potted Plants",
    price: 1000,
    image: p1,
    stock: 24,
    description:
      "A compact blue echeveria succulent in a white planter. Perfect for desks, shelves, windowsills, and indoor decor.",
  },
  {
    id: "2",
    name: "Copper Leaf/ Jacob's Coat",
    category: "Indoor Potted Plants",
    price: 1000,
    image: p2,
    stock: 12,
    description:
      "A colorful ornamental potted plant with beautiful copper-toned foliage. Ideal for adding natural color to indoor spaces.",
  },
  {
    id: "3",
    name: "Graptopetalum Ghost Plant",
    category: "Indoor Potted Plants",
    price: 1000,
    tag: "NEW",
    image: p3,
    stock: 20,
    description:
      "A hardy succulent with pale ghost-like leaves. Easy to care for and suitable for bright indoor spaces.",
  },
  {
    id: "4",
    name: "Dwarf Snake Plant - Green Planter Very Small Pot Size",
    category: "Indoor Potted Plants",
    price: 1500,
    tag: "HOT",
    image: p4,
    stock: 18,
    description:
      "A small snake plant in a green planter. A low-maintenance indoor plant suitable for homes and offices.",
  },
  {
    id: "5",
    name: "Echeveria Lilacina - Brown Planter Very Small Pot Size",
    category: "Indoor Potted Plants",
    price: 1500,
    image: p5,
    stock: 16,
    description:
      "A soft-toned echeveria succulent in a brown planter. Beautiful for tabletop styling and indoor plant displays.",
  },
  {
    id: "6",
    name: "Echeveria Black Prince - Brown Planter Very Small Pot Size",
    category: "Indoor Potted Plants",
    price: 1500,
    image: p6,
    stock: 15,
    description:
      "A striking echeveria variety with rich foliage tones, planted in a brown planter for modern indoor spaces.",
  },
  {
    id: "7",
    name: "Kalanchoe Longiflora - White Planter Very Small Pot Size",
    category: "Indoor Potted Plants",
    price: 1500,
    image: p7,
    stock: 14,
    description:
      "A beautiful kalanchoe in a white planter. Great for indoor decoration, gifting, and small plant collections.",
  },
  {
    id: "8",
    name: "Kalanchoe Thyrsiflora - White Planter Very Small Pot Size",
    category: "Indoor Potted Plants",
    price: 1500,
    tag: "SALE",
    image: p8,
    stock: 13,
    description:
      "A compact kalanchoe thyrsiflora in a white planter. Ideal for bright indoor areas and easy-care plant lovers.",
  },
  {
  id: "9",
  name: "Variegated Swedish Ivy / Plectranthus Australis Variegatus",
  category: "Outdoor Potted Plants",
  price: 2000,
  image: p1,
  stock: 15,
  description: "Beautiful trailing variegated ivy suitable for patios, balconies and gardens.",
},
{
  id: "10",
  name: "Oyster Plant / Tradescantia Spathacea - Clay Pot, Not Painted Medium Pot Size",
  category: "Outdoor Potted Plants",
  price: 2500,
  image: p2,
  stock: 12,
  description: "A vibrant ornamental plant ideal for outdoor landscaping and decorative spaces.",
},
{
  id: "11",
  name: "Oyster Plant / Tradescantia Spathacea - Clay Pot, Painted Black Small Pot Size",
  category: "Outdoor Potted Plants",
  price: 2500,
  image: p3,
  stock: 12,
  description: "Compact ornamental oyster plant in a decorative painted planter.",
},
{
  id: "12",
  name: "Agave / Agave Attenuata",
  category: "Outdoor Potted Plants",
  price: 2500,
  image: p4,
  stock: 10,
  description: "A hardy architectural agave perfect for outdoor landscaping.",
},
{
  id: "13",
  name: "Blue Chalksticks Plant",
  category: "Outdoor Potted Plants",
  price: 2500,
  image: p5,
  stock: 15,
  description: "A drought-resistant succulent with striking blue foliage.",
},
{
  id: "14",
  name: "Hibiscus Plant",
  category: "Outdoor Potted Plants",
  price: 2500,
  image: p6,
  stock: 20,
  description: "A flowering outdoor plant that adds color and beauty to any garden.",
},
{
  id: "15",
  name: "Variegated English Ivy - Clay Pot, Painted Yellow Small Pot Size",
  category: "Outdoor Potted Plants",
  price: 2500,
  image: p7,
  stock: 15,
  description: "Decorative climbing ivy suitable for patios, balconies and walls.",
},
{
  id: "16",
  name: "Eranthemum / Pseuderanthemum Atropurpureum",
  category: "Outdoor Potted Plants",
  price: 3000,
  image: p8,
  stock: 8,
  description: "A colorful ornamental shrub with striking foliage for outdoor gardens.",
},
];

export const findProduct = (id: string) =>
  products.find((product) => product.id === id);

export const categories = [
  {
    name: "Indoor Potted Plants",
    count: products.filter(
      (product) => product.category === "Indoor Potted Plants"
    ).length,
  },
  {
    name: "Outdoor Potted Plants",
    count: products.filter(
      (product) => product.category === "Outdoor Potted Plants"
    ).length,
  },
  {
    name: "Plant Stands",
    count: products.filter((product) => product.category === "Plant Stands")
      .length,
  },
  {
    name: "Compost Soil",
    count: products.filter((product) => product.category === "Compost Soil")
      .length,
  },
  {
    name: "Gardening Tools",
    count: products.filter((product) => product.category === "Gardening Tools")
      .length,
  },
];