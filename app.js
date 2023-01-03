const storageController = (function () {




})();




const ProductController = (function () {


    const Product = function (id,name,price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }


    const data = {
        products : [],
        selectedProduct : null,
        totalPrice:0
    }


    return {

        getProducts : function () {
            return data.products;
        },
        getData : function () {
            return data;
        },

        getProductById : function (id) {
            let product = null;
            data.products.forEach(function (prd) {
                if(prd.id== id){
                    product = prd;
                }
            })
            return product;
        },

        addProduct : function (name,price) {
            let id ;
            if(data.products.length > 0) {
                id = data.products[data.products.length - 1].id+1;
            } else {
                id = 0;
            }

            const newProduct = new Product(id,name,parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },
        getTotal : function () {
            let total = 0;

            data.products.forEach(function (item) {
                total += item.price;
            });
            data.totalPrice = total;
            return data.totalPrice;

        }

    }




})();



const UIController = (function () {

    const Selectors = {
        productList : "#item-list",
        addBtn : '.addBtn',
        productName : '#productName',
        productPrice : '#productPrice',
        productCard : '#productCard',
        totalTL : '#total-tl',
        totalDolar : "#total-dolar"
    }

    return {
        createProductList : function (products) {
            let html = '';


            products.forEach(prd => {
               html += `<tr>
                <td>${prd.id}</td>
                <td>${prd.name}</td>
                <td>${prd.price}</td>
                <td class="text-right">
                    <i class="far fa-edit edit-product"></i>
                </td>
            </tr>`;

            });


            document.querySelector(Selectors.productList).innerHTML = html;
        },

        getSelectors : function () {
            return Selectors;
        },
        addProduct : function (product) {
            document.querySelector(Selectors.productCard).style.display = 'block';
            var item = `
                <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="text-right">
                   <i class="far fa-edit edit-product"></i>
                </td>
            </tr> 
            `;
            document.querySelector(Selectors.productList).innerHTML += item;

        },

        clearInputs : function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },

        hideCard : function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },

        showTotal : function (total) {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 4.5;
        }

    }



})();




const App = (function (ProductCtrl,UICtrl) {

    const UISelectors = UIController.getSelectors();

    const loadEventListeners = function () {

        document.querySelector(UISelectors.addBtn).addEventListener("click",productAddSubmit);


        document.querySelector(UISelectors.productList).addEventListener("click",productEditSubmit);

    }

    const productAddSubmit = function (e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

         if(productName !== '' && productPrice !== '') {
             const newProduct = ProductCtrl.addProduct(productName,productPrice);
             UIController.addProduct(newProduct);

             const total = ProductCtrl.getTotal();

             UICtrl.showTotal(total);

             UIController.clearInputs();
         }



        e.preventDefault()
    }

    const productEditSubmit = function (e) {


        if(e.target.classList.contains('edit-product')) {
            const id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            const product = ProductCtrl.getProductById(id);
        }




        e.preventDefault();
    }

return {
    init : function () {
       const products = ProductCtrl.getProducts();
       if(products.length == 0) {
           UICtrl.hideCard();
       } else {
           UICtrl.createProductList(products);
       }
       loadEventListeners();
    }
}



})(ProductController,UIController);


App.init()