window.onload = ()=>{
// تعريف المتغيرات
let title = document.getElementById('title');
let price = document.getElementById('price');
let Total_Quantity = document.getElementById('Total-Quantity');
let discoint = document.getElementById('discoint');
let Total_Price = document.getElementById('Total-Price');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btn_create = document.getElementById('btn-create');
let mood = 'create';
let tmp;
let search_title;

// دالة لحساب الإجمالي
function getTotal() {
    if (price.value !== '') {
        let result_product = +price.value * (+count.value);
        let discoint_product = +discoint.value / 100;
        let result = result_product - (result_product * discoint_product);
        Total_Quantity.value = result_product;
        Total_Price.innerHTML = result;
    }
}

// دالة إضافة منتج جديد أو تحديث منتج موجود
btn_create.onclick = function () {
    let data = {
        title: title.value,
        price: price.value,
        Total_Quantity: Total_Quantity.value,
        discoint: discoint.value,
        Total_Price: Total_Price.innerHTML,
        count: count.value,
        category: category.value
    };
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
};

// دالة لمسح البيانات بعد الإضافة
function clearData() {
    title.value = '';
    price.value = '';
    Total_Quantity.value = '';
    discoint.value = '';
    Total_Price.innerHTML = '';
    count.value = '';
    category.value = '';
}

// قراءة البيانات من التخزين المحلي وعرضها
function readData() {
    let dataTable = [];

    for (let i = 0; i < ArrData.length; i++) {
        dataTable += `
            <tr>
                <!-- تعبئة البيانات هنا -->
            </tr>
        `;
    }

    // عرض البيانات في الجدول
    document.getElementById('tbody').innerHTML = dataTable;

    // تحديث زر حذف الكل
    let deleteAll = document.getElementById('deleteAll');
    if (ArrData.length > 0) {
        deleteAll.innerHTML = `
            <td><button id="btn-delete" onclick="deleteAll()" style="width:auto">DELETE All</button></td>
        `;
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
function deleteAll() {
    ArrData.splice(0);
    localStorage.clear();
    readData();
}

// دالة تحديث منتج
function updateData(id) {
    // تحديث البيانات في حقول الإدخال
    title.value = ArrData[id].title;
    price.value = ArrData[id].price;
    Total_Quantity.value = ArrData[id].Total_Quantity;
    discoint.value = ArrData[id].discoint;
    Total_Price.innerHTML = ArrData[id].Total_Price;
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
        let dataTable = [];

        for (let i = 0; i < ArrData.length; i++) {
            if (ArrData[i].title.includes(search_title)) {
                dataTable += `
                    <tr>
                        <!-- تعبئة البيانات هنا -->
                    </tr>
                `;
            }
        }

        // عرض البيانات المبحوث عنها
        document.getElementById('tbody').innerHTML = dataTable;
    }
}
}
