import men from "../assets/product_8.jpg";
import women from "../assets/product_9.jpg";
import kids from "../assets/product_15.webp";
import footwear from "../assets/product_26.avif";
import winterwear from "../assets/product_27.jpg";
import sportswear from "../assets/product_38.webp";
import upload_icon from "../assets/upload_icon.png";
import userImg from "../assets/user.png"
//  Products 
import M_huddy_1 from "./M_huddy_1.avif";
import M_huddy_2 from "./M_huddy_2.avif";
import M_huddy_3 from "./M_huddy_3.avif";
import M_huddy_4 from "./M_huddy_4.avif";
import M_huddy_5 from "./M_huddy_5.avif";
import W_huddy_1 from "./W_huddy_1.avif";
import W_huddy_2 from "./W_huddy_2.avif";
import W_huddy_3 from "./W_huddy_3.avif";
import W_huddy_4 from "./W_huddy_4.avif";
import W_huddy_5 from "./W_huddy_5.avif";

// Blogs
import blog1 from "../assets/blogs/blog1.avif";
import blog2 from "../assets/blogs/blog2.avif";
import blog3 from "../assets/blogs/blog3.avif";
import blog4 from "../assets/blogs/blog4.avif";

export const categories = [
  {
    name: "Men", 
    image: men,
  },
  {
    name: "Women",
    image: women,
  },
  {
    name: "Kids",
    image: kids,
  },
  {
    name: "Footwear",
    image: footwear,
  },
  {
    name: "Winterwear",
    image: winterwear,
  },
  {
    name: "Sportswear",
    image: sportswear,
  },
];

// export const demyProducts = [
//   {
//     _id: "1",
//     name: "Classic wear for women and men",
//     image: [M_huddy_3],
//     sized: ["S", "M", "L", "XL"],
//     description: "We have all types of varieties",
//     category: "Men",
//     popular: true,
//     offerPrice: 20,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "2",
//     name: "Elegant Hoodie Collection",
//     image: [M_huddy_4],
//     sized: ["M", "L", "XL"],
//     description: "Trendy hoodies designed for modern women.",
//     category: "Women",
//     popular: false,
//     offerPrice: 40,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "3",
//     name: "Casual Kids Wear",
//     image: [M_huddy_5],
//     sized: ["XS", "S", "M"],
//     description: "Soft and comfortable casuals for kids.",
//     category: "Kids",
//     popular: true,
//     offerPrice: 35,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "4",
//     name: "Winterwear Premium Pack",
//     image: [W_huddy_1],
//     sized: ["M", "L", "XL"],
//     description: "Keep yourself warm and stylish this winter.",
//     category: "Winterwear",
//     popular: true,
//     offerPrice: 25,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "5",
//     name: "Footwear Essentials",
//     image: [W_huddy_2],
//     sized: ["38", "40", "42", "44"],
//     description: "Durable and comfortable footwear for daily use.",
//     category: "Footwear",
//     popular: false,
//     offerPrice: 70,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "6",
//     name: "Sportswear Collection",
//     image: [W_huddy_3],
//     sized: ["S", "M", "L", "XL"],
//     description: "Breathable and flexible outfits for sports lovers.",
//     category: "Sportswear",
//     popular: true,
//     offerPrice: 10,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "7",
//     name: "Trendy Women’s Hoodies",
//     image: [W_huddy_4],
//     sized: ["S", "M", "L"],
//     description: "Perfect blend of fashion and comfort.",
//     category: "Women",
//     popular: true,
//     offerPrice: 30,
//     inStock: true,
//     category: "clothing",
//   },
//   {
//     _id: "8",
//     name: "Everyday Men’s Hoodie",
//     image: [W_huddy_5],
//     sized: ["M", "L", "XL"],
//     description: "Simple and stylish hoodie for daily wear.",
//     category: "Men",
//     popular: false,
//     offerPrice: 80,
//     inStock: true,
//     category: "kids",
//   },
// ];

export const blogs = [
  {
    _id: "1",
    image: [blog1],
    title: "Best Seller Huddies for Men",
  },
  {
    _id: "2",
    image: [blog2],
    title: "Best Seller Huddies for Women",
  },
  {
    _id: "3",
    image: [blog3],
    title: "Kids Choice",
  },
  {
    _id: "4",
    image: [blog4],
    title: "Trending Fashion",
  },
];

// dummyOrders.js
// export const dummyOrders = [
//   {
//     id: "ORD001",
//     user: {
//       name: "Sarah Ahmed",
//       email: "sarah@example.com",
//       phone: "+92-300-1234567",
//       address: "123 Street, Lahore, Pakistan",
//     },
//     items: [
//       {
//         _id: "1",
//         name: "Classic wear for women and men",
//         qty: 2,
//         price: 2500,
//         size: "M",
//         image:
//           "https://images.unsplash.com/photo-1520975918318-5cc1b50d0f78?auto=format&fit=crop&w=300&q=80",
//       },
//       {
//         _id: "4",
//         name: "Casual Sneakers",
//         qty: 1,
//         price: 4500,
//         size: "42",
//         image:
//           "https://images.unsplash.com/photo-1600185365926-3a2e51d1f5a1?auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     totalAmount: 9500,
//     paymentMethod: "Cash on Delivery",
//     status: "Pending",
//     orderDate: "2025-08-20",
//   },
//   {
//     id: "ORD002",
//     user: {
//       name: "Ali Khan",
//       email: "ali.khan@example.com",
//       phone: "+92-321-9876543",
//       address: "456 Avenue, Karachi, Pakistan",
//     },
//     items: [
//       {
//         _id: "2",
//         name: "Elegant Dress",
//         qty: 1,
//         price: 5200,
//         size: "L",
//         image:
//           "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     totalAmount: 5200,
//     paymentMethod: "Credit Card",
//     status: "Shipped",
//     orderDate: "2025-08-19",
//   },
//   {
//     id: "ORD003",
//     user: {
//       name: "Fatima Noor",
//       email: "fatima.noor@example.com",
//       phone: "+92-345-1122334",
//       address: "789 Colony, Islamabad, Pakistan",
//     },
//     items: [
//       {
//         _id: "3",
//         name: "Luxury Handbag",
//         qty: 1,
//         price: 7800,
//         size: "One Size",
//         image:
//           "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80",
//       },
//       {
//         _id: "5",
//         name: "Wrist Watch",
//         qty: 1,
//         price: 6500,
//         size: "Standard",
//         image:
//           "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     totalAmount: 14300,
//     paymentMethod: "Bank Transfer",
//     status: "Delivered",
//     orderDate: "2025-08-15",
//   },
// ];

export {upload_icon, userImg};

