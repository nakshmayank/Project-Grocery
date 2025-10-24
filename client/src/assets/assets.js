import wishlist_icon_filled from "./wishlist_icon_fill.svg";
import wishlist_icon_empty from "./wishlist_icon_empty.svg";
import wishlist_icon_outline from "./wishlist_icon_outline.svg";
import logo from "./logo.png";
import logout from "./logout.svg";
import home from "./home.svg";
import star from "./star.png";
import star_dull from "./star_dull.png";
import main_banner from "./main_banner.jpg";
import main_banner_sm from "./main_banner_sm.jpg";
import bottom_banner from "./bottom_banner.jpg";
import bottom_banner_sm from "./bottom_banner_sm.jpg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.png";
import cart from "./cart.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon_2.svg";
import menu_icon from "./menu_icon.svg";
import delivery_truck from "./delivery-truck.png";
import leaf_icon from "./leaves.png";
import price_tag from "./price-tag.png";
import shield_badge from "./shield-badge.png";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import add_address_image from "./add_address_image.png";
import organic_vegetable_image from "./organic_vegitable_image.png";
import fresh_fruits_image from "./fresh_fruits_image.png";
import bottles_image from "./bottles_image.png";
import maggi_image from "./maggi_image.png";
import dairy_product_image from "./dairy_product_image.png";
import bakery_image from "./bakery_image.png";
import grain_image from "./grain_image.png";


export const assets = {
  logo,
  main_banner,
  main_banner_sm,
  bottom_banner,
  bottom_banner_sm,
  star,
  logout,
  home,
  star_dull,
  wishlist_icon_outline,
  wishlist_icon_filled,
  wishlist_icon_empty,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  cart,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck,
  leaf_icon,
  price_tag,
  shield_badge,
  black_arrow_icon,
  white_arrow_icon,
  add_address_image,
};

export const categories = [
  {
    text: "Organic veggies",
    path: "Vegetables",
    image: organic_vegetable_image,
    bgColor: "#FEF6DA",
  },
  {
    text: "Fresh Fruits",
    path: "Fruits",
    image: fresh_fruits_image,
    bgColor: "#FEE0E0",
  },
  {
    text: "Cold Drinks",
    path: "Drinks",
    image: bottles_image,
    bgColor: "#F0F5DE",
  },
  {
    text: "Instant Food",
    path: "Instant",
    image: maggi_image,
    bgColor: "#E1F5EC",
  },
  {
    text: "Dairy Products",
    path: "Dairy",
    image: dairy_product_image,
    bgColor: "#FEE6CD",
  },
  {
    text: "Bakery & Breads",
    path: "Bakery",
    image: bakery_image,
    bgColor: "#E0F6FE",
  },
  {
    text: "Grains & Cereals",
    path: "Grains",
    image: grain_image,
    bgColor: "#F1E3F9",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: price_tag,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: shield_badge,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];