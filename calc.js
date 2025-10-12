document.addEventListener('DOMContentLoaded', function () {
    const product = document.getElementById('product');
    const quantity = document.getElementById('quantity');
    const result = document.getElementById('result');
    const button = document.getElementById('calculate');

    function formatRub(n) {
        return n.toLocaleString('ru-RU') + ' ₽';
    }

    button.addEventListener('click', function () {
        const qtyStr = quantity.value.trim();

        if (!/^[1-9]\d*$/.test(qtyStr)) {
            result.textContent = 'Ошибка: введите корректное количество (целое число больше нуля).';
            result.style.color = 'red';
            return;
        }

        const qty = parseInt(qtyStr, 10);
        const price = parseInt(product.value, 10);
        const total = price * qty;

        result.style.color = 'black';
        result.textContent = 'Общая стоимость заказа: ' + formatRub(total);
    });
});