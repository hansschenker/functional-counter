import { fromEvent, merge, BehaviorSubject, of } from "rxjs";
import { map, tap, filter, mergeMap, scan } from "rxjs/operators";

import "./styles.css";

import img1 from "./assets/images/img-1.jpg"
import img2 from "./assets/images/img-2.jpg"
import img3 from "./assets/images/img-3.jpg"
import img4 from "./assets/images/img-4.jpg"

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};
export type Cart = {products: Product[]};
// product list
const products = [
  {
    id: 2,
    name: "Product 2",
    price: 15,
    imageUrl: "./assets/images/img-2.jpg",
    description: "This is Product 2",
  },
  {
    id: 1,
    name: "Product 1",
    price: 10,
    imageUrl: "./assets/images/img-1.jpg",
    description: "This is Product 1",
  },

  {
    id: 3,
    name: "Product 3",
    price: 20,
    imageUrl: "./assets/images/img-3.jpg",
    description: "This is Product 3",
  },
  {
    id: 4,
    name: "Product 4",
    price: 40,
    imageUrl: "./assets/images/img-4.jpg",
    description: "This is Product 4",
  },
];

const productState = of(products);

const productListEl = document.querySelector("#product-list");

// cart
const cartEl = document.querySelector(".cart");

const addProductLi = (product: Product) => {
  let img
  if (product.id === 1) {
    img = img1
  } else if (product.id === 2) {
    img = img2
  } else if (product.id === 3){
    img = img3
  } else if (product.id === 4) {
    img = img4
  }
  return `<li class="product" id="${product.id}">
  <div>${product.name}</div>
  <img width="100" src= ${img} />
  </li>`;
};

// products display
products.forEach((product) => {
  const productLi = document.createElement("li");
  productLi.innerHTML = addProductLi(product);
  productListEl!.appendChild(productLi);
});

const productListChange = fromEvent<MouseEvent>(
  productListEl!,
  "click"
).subscribe((e: MouseEvent) => {
  console.log("product change", e.target);
});
