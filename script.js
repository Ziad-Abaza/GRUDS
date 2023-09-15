<<<<<<< HEAD
// تعريف المتغيرات
=======
window.onload = ()=>{
 // تعريف المتغيرات
>>>>>>> 03fba7cf767cff720cc5b92c65b1ee87a5c3efa5
let title = document.getElementById('title');
let price = document.getElementById('price');
let Total_Quantity = document.getElementById('Total-Quantity');
let discount = document.getElementById('discount');
let Total_Price = document.getElementById('Total-Price');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btn_create = document.getElementById('btn-create');
let mood = 'create';
let tmp;
let search_title;
console.log(title,price,Total_Price,Total_Quantity,discount,count,btn_create)

// دالة لحساب الإجمالي
function getTotal() {
    if (price.value !== '') {
        let result_product = +price.value * (+count.value);
        let discount_product = +discount.value / 100;
        let result = result_product - (result_product * discount_product);
        Total_Quantity.value = result_product;
        Total_Price.innerText = result;
    }
}

let ArrData;
if (localStorage.product != null) {
    ArrData = JSON.parse(localStorage.product);
} else {
    ArrData = [];
}

// دالة إضافة منتج جديد أو تحديث منتج موجود
btn_create.onclick = function () {
    let data = {
        title: title.value,
        price: price.value,
        Total_Quantity: Total_Quantity.value,
        discount: discount.value,
        Total_Price: Total_Price.innerText,
        count: count.value,
        category: category.value
    };
    if(title.value && price.value && category.value != ''){
        if (mood === 'create') {
            // إضافة منتج جديد
            ArrData.push(data);
            localStorage.setItem('product', JSON.stringify(ArrData));
            readData();
            clearData();
        } else {
            // تحديث منتج موجود
            ArrData[tmp] = data;
            localStorage.setItem('product', JSON.stringify(ArrData));
            readData();
            clearData();
            mood = 'create';
            btn_create.innerHTML = 'create';
        }
    }else{
        alert('the value is NULL')
    }
};

// دالة لمسح البيانات بعد الإضافة
function clearData() {
    title.value = '';
    price.value = '';
    Total_Quantity.value = '';
    discount.value = '';
    Total_Price.innerText = '';
    count.value = '';
    category.value = '';
}

// قراءة البيانات من التخزين المحلي وعرضها
function readData() {
    let dataTable = '';

    for (let i = 0; i < ArrData.length; i++) {
        dataTable += `
        <tr>
            <td>${i + 1}</td>
            <td>${ArrData[i].title}</td>
            <td>${ArrData[i].category}</td>
            <td>${ArrData[i].price}</td>
            <td>${ArrData[i].count}</td>
            <td>${ArrData[i].Total_Quantity}</td>
            <td>${ArrData[i].discount}%</td>
            <td>${ArrData[i].Total_Price}</td>
            <td><button id="btn-update" onclick="updateData(${i})">update</button></td>
            <td><button id="btn-delete" onclick="deleteData(${i})">delete</button></td>
        </tr>`;
    };

    // عرض البيانات في الجدول
document.getElementById('tbody').innerHTML = dataTable;

// تحديث زر حذف الكل
let deleteAll = document.getElementById('deleteAll');
    if (ArrData.length > 0) {
        deleteAll.innerHTML = `
            <td><button id="btn-delete" onclick="deleteAllData()" style="width:auto">delete all</button></td>`;
    } else {
        deleteAll.innerHTML = '';
    }
}

// قراءة البيانات عند تحميل الصفحة
readData();

// دالة حذف منتج
function deleteData(id) {
    ArrData.splice(id, 1);
    localStorage.product = JSON.stringify(ArrData);
    readData();
}

// دالة حذف جميع المنتجات
function deleteAllData() {
    ArrData = [];
    localStorage.removeItem('product');
    readData();
}

// دالة تحديث منتج
function updateData(id) {
    // تحديث البيانات في حقول الإدخال
    title.value = ArrData[id].title;
    price.value = ArrData[id].price;
    Total_Quantity.value = ArrData[id].Total_Quantity;
    discount.value = ArrData[id].discount;
    Total_Price.innerText = ArrData[id].Total_Price;
    count.value = ArrData[id].count;
    category.value = ArrData[id].category;

    // تغيير نص زر الإضافة/التحديث وتعيين وضع التحديث
    btn_create.innerHTML = 'update';
    mood = 'update';
    tmp = id;

    // التمرير إلى أعلى الصفحة بسلاسة
    scroll({
        top: 0,
        behavior: 'smooth'
    });

    // إعادة قراءة البيانات
    readData();
}

// دالة البحث عن منتج باسمه
function search(title) {
    search_title = title;
    GetSearch();

function GetSearch() {
    let dataTable = '';

    for (let i = 0; i < ArrData.length; i++) {
        if (ArrData[i].title.includes(search_title)) {
            dataTable += `
            <tr>
                <td>${i + 1}</td>
                <td>${ArrData[i].title}</td>
                <td>${ArrData[i].category}</td>
                <td>${ArrData[i].price}</td>
                <td>${ArrData[i].count}</td>
                <td>${ArrData[i].Total_Quantity}</td>
                <td>${ArrData[i].discount}%</td>
                <td>${ArrData[i].Total_Price}</td>
                <td><button id="btn-update" onclick="updateData(${i})">update</button></td>
                <td><button id="btn-delete" onclick="deleteData(${i})">delete</button></td>
            </tr>`;
        }
    }
    // عرض البيانات المبحوث عنها
    document.getElementById('tbody').innerHTML = dataTable;
    }
}

}
