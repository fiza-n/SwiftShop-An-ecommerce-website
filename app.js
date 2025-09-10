const productImg = document.querySelector('.product-img');
const productTitle = document.querySelector('#product-title');
const productPrice = document.querySelector('#product-price');
const addtocartButton = document.querySelector('#addtocart');

function displayProducts(p){
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    productImg.appendChild(img);
    //add product title
    productTitle = p.title;

    // add product price
    productPrice = p.price;


}
let products = [];
 fetch("https://fakestoreapi.com/products")
.then((response)=>{
    return response.json()
})
.then((data)=>{
    products = data;
    console.log(data);
})
.catch((e)=>{
    console.log(e);
})
console.log(products[0]);
