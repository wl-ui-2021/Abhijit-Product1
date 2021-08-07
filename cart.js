const shoppingCartContent = document.querySelector('#shoppping-cart');
loadEventListen();
function loadEventListen(){
    shoppingCartContent.addEventListener('click',removeProduct)
    document.addEventListener('DOMContentLoaded',onloaded);
    document.getElementById('checkout').addEventListener('click',clearAllProduct)
}


function getProductFromStorage(){
    let products;
    // products=JSON.parse(localStorage.getItem('products'))

    if(localStorage.getItem('products')===null){
        return products=[]
    }else{
        products=JSON.parse(localStorage.getItem('products'))
    }
    return products;
    
}

function removeProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('clearitem')){
        // console.log(e.target.parentElement)
        product=e.target.parentElement.parentElement
        productId=product.querySelector('button').getAttribute('data-id')
        // console.log(productId)
        // console.log("pro",product)
        e.target.parentElement.parentElement.remove()
        removeProductFromLocal(productId)
    }
    
}

function removeProductFromLocal(productId){
    console.log("product from local",productId)
    let products=getProductFromStorage();
    products.forEach((product,index)=>{
        if(product.id==productId){
            products.splice(index,1)
        }
    })
    localStorage.setItem('products',JSON.stringify(products))
}


function clearAllProduct(e){
    // alert('success')
    localStorage.clear('products')
    window.location.reload();
}

function onloaded(){
    // console.log("here")
  
    let productsOn=getProductFromStorage();
    // console.log("pOn",productsOn)
    // const row = document.createElement('tr');
    let output='';
    productsOn.forEach(function(pDa){
        let count=1;
        output+=`
            <tr>
            <td>${pDa.id}</td>
            <td>${pDa.title}</td>
            <td><img src="${pDa.image}" width="35px"></td>
            <td>${count}</td>
            <td>${pDa.price}</td>
            <td><button class="clearitem" data-id="${pDa.id}"> Remove </button></td>
            </tr>
            `
        
    })
    shoppingCartContent.innerHTML=output
}


document.getElementById('sucess').addEventListener('click',function(){
    alert('Your Product Successfully Placed , Happy Shoping!')
})