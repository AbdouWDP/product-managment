let price = document.querySelector(".price")
let taxes = document.querySelector(".taxes")
let ads = document.querySelector(".ads")
let discount = document.querySelector(".discount")
let total = document.getElementById("total")
let title = document.querySelector(".title")
let create = document.getElementById("create")
let tableBody = document.querySelector(".tableBody")
let category = document.querySelector(".category")
let count = document.querySelector(".count")
let temp;
let mood = "create"

window.onload = function(){
    title.focus()
}

function getTotal(){
    let discountPercentage = Number(price.value) * Number(discount.value) / 100
    let newPrice = Number(price.value) + Number(taxes.value) + Number(ads.value)
    let totalPrice = newPrice - discountPercentage
    let final_price = totalPrice.toFixed(2)
    total.innerHTML = final_price
    return final_price
}
function keyUp(){
    total.innerHTML = getTotal()
    if(price.value == ""){
        total.style.backgroundColor = "#E5383B"
    }
    else{
        total.style.backgroundColor = "#2D6A4F"
    }
    if(discount.value > 100){
        discount.style.border = "2px solid #E5383B"
        document.querySelector(".alert").style.display = "block"
        document.querySelector("#create").style.display = "none"
        total.innerHTML = "0"
        total.style.backgroundColor = "#E5383B"
    }
    else{
        discount.style.border = "none"
        document.querySelector(".alert").style.display = "none"
        document.querySelector("#create").style.display = "block"
    }
}

let productData;
if(localStorage.product != null){
    productData = JSON.parse(localStorage.product)
}
else{
    productData = []
}

function fillTable(){
    tableBody.innerHTML = ""
    for(var product = 0; product < productData.length; product++){
        let content = 
        `
            <tr>
                <td>${product + 1}</td>
                <td>${productData[product].title}</td>
                <td>${productData[product].price}</td>
                <td>${productData[product].taxes}</td>
                <td>${productData[product].ads}</td>
                <td>${productData[product].discount}</td>
                <td>${productData[product].total}</td>
                <td>${productData[product].category}</td>
                <td><button id="update" onclick = "updateProduct(${product})">Update &nbsp;<i class="fa-solid fa-pen"></i></button></td>
                <td><button id="del" onclick = "deleteProduct(${product})">Delete &nbsp;<i class="fa-solid fa-trash-can"></i></button></td>
            </tr>
        `
        tableBody.innerHTML += content
        let deleteAll = document.getElementById("deleteAll")
        if(productData.length > 1){
            deleteAll.innerHTML = `<button id="deleteAllProduct" onclick="deleteAllProducts()">Delete All (${productData.length})</button>`
        }
        else{
            deleteAll.innerHTML = ""
        }
    }
}

function clearInputs(){
    title.value = ""
    price.value = ""
    ads.value = ""
    discount.value = ""
    taxes.value = ""
    count.value = ""
    total.innerHTML = ""
    category.value = ""
    total.style.backgroundColor = "#E5383B"
    title.focus()
}

create.onclick = function(){
    let new_product = {
        "title": title.value,
        "price": price.value,
        "taxes": taxes.value,
        "ads": ads.value,
        "discount": discount.value,
        "total": total.innerHTML,
        "count": count.value,
        "category": category.value
    }
    
    if(mood == "create"){
        if(new_product.count > 1){
            for(var i = 0; i < new_product.count; i++){
                productData.push(new_product)
            }
        }
        else{
            productData.push(new_product)
        }
    }
    else{
        productData[temp] = new_product
        mood = "create"
        count.style.display = "block"
        create.innerHTML = `Create <i class="fa-solid fa-circle-plus">`
    }
    localStorage.setItem("product", JSON.stringify(productData))
    fillTable()
    clearInputs()
}

function deleteProduct(product){
    productData.splice(product, 1)
    localStorage.product = JSON.stringify(productData)
    fillTable()
}

function updateProduct(product){
    title.value = productData[product].title
    price.value = productData[product].price
    ads.value = productData[product].ads
    category.value = productData[product].category
    taxes.value = productData[product].taxes
    discount.value = productData[product].discount
    keyUp()
    count.style.display = "none"
    create.innerHTML = `Update &nbsp;<i class="fa-solid fa-pen"></i>`
    temp = product
    mood = "update"
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

function deleteAllProducts(){
    localStorage.clear()
    productData.splice(0)
    fillTable()
}

fillTable()