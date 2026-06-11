import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  latin: string;
  category: "Succulents" | "Terrariums" | "Potter Plants" | "House Plants" | "Seeds";
  price: number;
  compareAt?: number;
  tag?: "SALE" | "HOT" | "NEW";
  image: string;
  stock: number;
  description: string;
};

export const products: Product[] = [
  { id: "1", slug: "geo-aloe", name: "Geo Aloe", latin: "Aloe vera", category: "Succulents", price: 79, compareAt: 85, tag: "SALE", image: p1, stock: 24, description: "A spiky aloe in a faceted concrete pot. Loves bright, indirect light and a sparing pour every other week." },
  { id: "2", slug: "duo-tone-echeveria", name: "Duo-tone Echeveria", latin: "Echeveria elegans", category: "Succulents", price: 75, compareAt: 87, tag: "SALE", image: p2, stock: 12, description: "A rosette succulent in a two-tone ceramic pot. Sculptural, easygoing, deeply unbothered." },
  { id: "3", slug: "maison-kalanchoe", name: "Maison Kalanchoe", latin: "Kalanchoe blossfeldiana", category: "Potter Plants", price: 12, tag: "HOT", image: p3, stock: 58, description: "Cheerful pink blooms tucked into a vintage enamel pail. A little sun goes a long way." },
  { id: "4", slug: "brass-stand-succulent", name: "Brass Stand Succulent", latin: "Echeveria 'Lola'", category: "Potter Plants", price: 55, compareAt: 76, tag: "SALE", image: p4, stock: 9, description: "A pale rosette lifted by a hairpin brass stand. Equal parts plant and sculpture." },
  { id: "5", slug: "anthurium-arc", name: "Anthurium Arc", latin: "Anthurium clarinervium", category: "House Plants", price: 89, tag: "NEW", image: p5, stock: 16, description: "Glossy, generous leaves in a tall column planter. The room will feel taller too." },
  { id: "6", slug: "topiary-twins", name: "Topiary Twins", latin: "Buxus sempervirens", category: "House Plants", price: 64, tag: "HOT", image: p6, stock: 22, description: "A pair of round topiaries in warm wood pots. Quiet symmetry for an entryway." },
  { id: "7", slug: "boston-fern", name: "Boston Fern", latin: "Nephrolepis exaltata", category: "House Plants", price: 38, image: p7, stock: 41, description: "Lush, feathery fronds spilling out of terracotta. A bathroom favorite." },
  { id: "8", slug: "varigated-sansevieria", name: "Variegated Sansevieria", latin: "Sansevieria trifasciata", category: "House Plants", price: 46, image: p8, stock: 33, description: "Architectural striped leaves in a soft matte planter. Nearly indestructible." },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categories = [
  { name: "Small Plants", count: 13 },
  { name: "Succulents", count: 3 },
  { name: "Potter Plants", count: 6 },
  { name: "Terrariums", count: 1 },
  { name: "House Plants", count: 9 },
  { name: "Seeds", count: 1 },
];
