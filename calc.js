"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var product = document.getElementById("product");
    var quantity = document.getElementById("quantity");
    var result = document.getElementById("result");
    var button = document.getElementById("calculate");

    function formatRub(n) {
        return n.toLocaleString("ru-RU") + " ₽";
    }

    button.addEventListener("click", function () {
        var qtyStr = quantity.value.trim();

        if (!(/^[1-9]\d*$/).test(qtyStr)) {
            result.textContent =
                "Ошибка: введите корректное количество " +
                "(целое число больше нуля).";
            result.style.color = "red";
            return;
        }

        var qty = parseInt(qtyStr, 10);
        var price = parseInt(product.value, 10);
        var total = price * qty;

        result.style.color = "black";
        result.textContent =
            "Общая стоимость заказа: " + formatRub(total);
    });
});
