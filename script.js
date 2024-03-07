let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let tmp;


//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'blue';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}


//create product
let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}
else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
        if (mode === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro[tmp] = newPro;
            mode = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData()
    }

    //save local storage
    localStorage.setItem('product', JSON.stringify(dataPro))

    showData()
}


//clear input
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//read data
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i +1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="ubdate" onclick="updateData(${i})">ubdate</button></td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete all(${dataPro.length})</button>
        `
    }
    else {
        btnDelete.innerHTML = '';
    }

}
showData()


//delete 
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}


//deleta all
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'ubdate';
    mode = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
    
}


//search
let searchMode = 'title'

function getSearchMode(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMode = 'title';
        search.placholder = 'search by Title'
    }
    else {
        searchMode = 'category'
        search.placholder = 'search by Category'
    }
    search.focus();
}

function searchData(value) {
    let table = '';
    if (searchMode == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="ubdate" onclick="updateData(${i})">ubdate</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `
            }
        }
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="ubdate" onclick="updateData(${i})">ubdate</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
