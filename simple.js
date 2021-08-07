//Data loaded From Form & Storage

load()
function load(){
    document.querySelector('#formID').addEventListener('submit',getDataFromForm); 
    document.addEventListener('DOMContentLoaded' , onload);
    loadproData()

    
}

var productsAdd=[];
function getDataFromForm(eve){
    // alert('success')
    eve.preventDefault();
    var product={
        Name:document.getElementById('pName').value,
        Img:document.getElementById('pImg').value,
        Price:document.getElementById('price').value
    }
    // console.log(product)
    productsAdd.push(product)
    // console.log(productsAdd)
    document.querySelector('form').reset();
    
    localStorage.setItem('product',JSON.stringify(productsAdd));
    
}


function getfromlocal(){
    let products;
    if(localStorage.getItem('product')===null){
        return products=[];
    }else{
        products=JSON.parse(localStorage.getItem('product'))
    }
    return products; 
}


function onload(){

    let productsOn=getfromlocal()
    // console.log(productsOn)
    let count=8;
    let output='';
    productsOn.forEach(function(pData){
        output +=`
        <div class="card m-2">
            <div class="card-header">
                <img src="${pData.Img}" class="card-img-top img-fluid">
            </div>
            <div class="card-body">
                
                    <h1 class="card-title text-center">${pData.Name}</h1>
                    <p class="card-text price text-center">&#8377; ${pData.Price}.00</p>
                    <button class="btn btn-primary add-to-cart nav-sty" data-id="${count++}" id="productbtn">Add to cart </button>
                
            </div>
        </div>`
    })
    document.getElementById('pro_card').innerHTML=output;
}


// ===========================================================
//Data load From XHR request from JSON file.

const productX = document.querySelector('#xhrcard');

function loadproData(){
    const xhr=new XMLHttpRequest();
    xhr.open('GET','data.json',true);
    xhr.onload=function(){
        if(this.status===200){
            const proDa=JSON.parse(this.response)
            // console.log(proDa)
            // const tr=document.createElement('tr');
            let output1='';
            let count1=8;
            proDa.forEach(function(pDa){
                output1 +=`
                <div class="card m-2">
                    <div class="card-header">
                        <img src="${pDa.img}" class="card-img-top img-fluid">
                    </div>
                    <div class="card-body">
                        <h1 class="card-title text-center">${pDa.name}</h1>
                        <p class="card-text price text-center">&#8377; ${pDa.price}.00</p>
                        <button class="btn btn-primary add-to-cart nav-sty" data-id="${count1++}" id="productbtn">Add to cart </button>
                
                    </div>
                </div>`
            })
            
            productX.innerHTML=output1;
        }
    }
    xhr.send();
}



// ========================================================
//Data loaded from HTML


loadEventListen();
function loadEventListen(){
    document.getElementById('productsData').addEventListener('click' , buyProduct)
   
}


function buyProduct(event){
    event.preventDefault();
    // console.log(event.target)
    // alert('success')
    if(event.target.classList.contains('add-to-cart')){
        // console.log(event.target.parentElement.parentElement)
        const product = event.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

function getProductInfo(product){
    // console.log(product )
    const productInfo = {
        title : product.querySelector('h2').textContent,
        image : product.querySelector('img').src,
        price : product.querySelector('.price').textContent,
        id : product.querySelector('button').getAttribute('data-id')
    }
    // console.log(productInfo)
    addIntoCart(productInfo);
}

function addIntoCart(product){
    // console.log(product)
    // const row = document.createElement('tr');
    // row.innerHTML=`
    // <td><img src="${product.image}"></td>
    // <td>${product.title}</td>
    // <td>${product.price}></td>
    // <button class="clearitem" data-id="${product.id}"> clear </button>
    // `
    // shoppingCartContent.appendChild(row); 

    //save to loca storage
    saveIntoStorage(product);
}

function saveIntoStorage(productData){

    let products = getProductFromStorage();
    products.push(productData)

    localStorage.setItem('products',JSON.stringify(products))
}

function getProductFromStorage(){
    let products;
    // products=JSON.parse(localStorage.getItem('products'))
    console.log('products from storage',products)

    if(localStorage.getItem('products')===null){
        return products=[]
    }else{
        products=JSON.parse(localStorage.getItem('products'))
    }
    return products;
    
}