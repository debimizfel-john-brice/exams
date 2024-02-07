let id = -1;

function add_product() {

    const valid = validation();
    if (!valid) return;


    const product = get_product();
    const product_list = get_product_from_storage();

    product_list.push(product);

    save_product_to_storage(product_list);
    display_product(product_list);

    clear_form();
}


function validation() {

    const product_name_box = document.getElementById("product_name_box");
    const price_box = document.getElementById("price_box");
    const img_link_box = document.getElementById("img_link_box");

    const product_name_box_error = document.getElementById("product_name_box_error");
    const price_box_error = document.getElementById("price_box_error");
    const img_link_box_error = document.getElementById("img_link_box_error");

    const product_name = product_name_box.value;
    const price = price_box.value;
    const img = img_link_box.value;

    product_name_box_error.innerText = "";
    price_box_error.innerText = "";
    img_link_box_error.innerText = "";

    if (product_name === "") {
        product_name_box_error.innerText = "Required";
        return false;
    }

    if (price === "") {
        price_box_error.innerText = "Required";
        return false;
    } else if (price <= 0) {
        price_box_error.innerText = "Price should be greater than 0";
        return false;
    }

    if (img === "") {
        img_link_box_error.innerText = "Required";
        return false;
    }

    return true;

}


function get_product() {

    id += 1;

    const product_name_box = document.getElementById("product_name_box");
    const price_box = document.getElementById("price_box");
    const category_box = document.getElementById("category_box");
    const img_link_box = document.getElementById("img_link_box");

    const product_name = product_name_box.value;
    const price = price_box.value;
    const category = category_box.value;
    const img = img_link_box.value;

    const product = {
        id,
        product_name,
        price,
        category,
        img
    };

    return product;
}

function get_product_from_storage() {

    const product_JSON = localStorage.getItem("products");
    const products = (product_JSON === null) ? [] : JSON.parse(product_JSON);

    return products;
}

function save_product_to_storage(product_list) {

    const product_str = JSON.stringify(product_list);
    localStorage.setItem("products", product_str);

}

function display_product(product_list) {


    const table_body_box = document.getElementById("table_body_box");
    table_body_box.innerHTML = "";

    for (const product of product_list) {
        const row = `<tr>
                      <td>${product.product_name}</td>
                      <td>${product.price}</td>
                      <td>${product.category}</td>
                      <td><img src="${product.img}" width="100" height="100" style="display: block; margin: auto;"></td>
                      <td><i class="material-icons"  onclick="delete_item(${product.id})">delete</i>
                      </td>
                      </tr>`;
        table_body_box.innerHTML += row;
    }


}

function clear_form() {
    document.getElementById("product_name_box").value = "";
    document.getElementById("price_box").value = "";
    document.getElementById("img_link_box").value = "";
    document.getElementById("product_name_box").focus();
}

function load_products() {
    const products = get_product_from_storage();
    display_product(products);
}

load_products();


function clear_list() {

    const table_body_box = document.getElementById("table_body_box");
    const list_str = get_product_from_storage();

    table_body_box.innerHTML = "";
    localStorage.removeItem("products", list_str);

}

function delete_item(id) {

    const product_list = get_product_from_storage();

    for (let i = 0; i < product_list.length; i++) {

        if (product_list[i].id == id) {
            product_list.splice(i, 1);
        }
    }

    save_product_to_storage(product_list);
    display_product(product_list);
}