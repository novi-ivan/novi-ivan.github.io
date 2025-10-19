/*jslint browser */
/*global window, document */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const result = document.getElementById("result");
    const button = document.getElementById("calculate");

    const serviceRadios = document.getElementsByName("serviceType");
    const optionBox = document.getElementById("optionBox");
    const propertyBox = document.getElementById("propertyBox");
    const optionSelect = document.getElementById("option");
    const propCheckbox = document.getElementById("prop");

    const ERR_QTY_PART1 = "Ошибка: введите корректное количество ";
    const ERR_QTY_PART2 = "(целое число больше нуля).";
    const SERVICE_SELECTOR = "input[name=\"serviceType\"]:checked";

    const forEach = Array.prototype.forEach;

    function formatRub(n) {
        return n.toLocaleString("ru-RU") + " ₽";
    }

    function recalc() {
        let qtyStr = "";
        let qty = 0;
        let base = 0;
        let type = 1;
        let add = 0;
        let pricePerItem = 0;
        let total = 0;

        qtyStr = quantity.value.trim();

        if (!(/^[1-9]\d*$/).test(qtyStr)) {
            result.style.color = "red";
            result.textContent = ERR_QTY_PART1 + ERR_QTY_PART2;
            return;
        }

        qty = parseInt(qtyStr, 10);
        base = parseInt(product.value, 10);

        const checked = document.querySelector(SERVICE_SELECTOR);
        if (checked) {
            type = parseInt(checked.value, 10);
        }

        if (type === 1) {
            optionBox.style.display = "none";
            propertyBox.style.display = "none";
        } else if (type === 2) {
            optionBox.style.display = "block";
            propertyBox.style.display = "none";
        } else if (type === 3) {
            optionBox.style.display = "none";
            propertyBox.style.display = "block";
        }

        if (type === 2) {
            add += parseInt(optionSelect.value, 10);
        }
        if (type === 3 && propCheckbox.checked) {
            add += parseInt(propCheckbox.value, 10);
        }

        pricePerItem = base + add;
        total = pricePerItem * qty;

        result.style.color = "black";
        result.textContent = "Общая стоимость заказа: " + formatRub(total);
    }

    button.addEventListener("click", recalc);
    product.addEventListener("change", recalc);
    quantity.addEventListener("input", recalc);
    optionSelect.addEventListener("change", recalc);
    propCheckbox.addEventListener("change", recalc);
    forEach.call(serviceRadios, function (r) {
        r.addEventListener("change", recalc);
    });
});