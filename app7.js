/*jslint browser, for, this */
/*global window, document */

(function () {
    "use strict";

    var BREAKPOINT = 768;
    var track = document.getElementById("track");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".slide"));
    var btnPrev = document.getElementById("btnPrev");
    var btnNext = document.getElementById("btnNext");
    var currentPage = document.getElementById("currentPage");
    var totalPages = document.getElementById("totalPages");
    var visible;
    var index = 0;

    if (window.innerWidth <= BREAKPOINT) {
        visible = 1;
    } else {
        visible = 3;
    }

    function pages() {
        return Math.ceil(slides.length / visible);
    }

    function lastStart() {
        return (pages() - 1) * visible;
    }

    function gap() {
        var r1;
        var r2;

        if (slides.length < 2) {
            return 0;
        }

        r1 = slides[0].getBoundingClientRect();
        r2 = slides[1].getBoundingClientRect();
        return r2.left - r1.right;
    }

    function update() {
        var w = slides[0].offsetWidth + gap();

        track.style.transform = "translateX(-" + (index * w) + "px)";
        currentPage.textContent = String(Math.floor(index / visible) + 1);
        totalPages.textContent = String(pages());
    }

    function next() {
        if (index + visible <= lastStart()) {
            index += visible;
        } else {
            index = 0;
        }
        update();
    }

    function prev() {
        if (index - visible >= 0) {
            index -= visible;
        } else {
            index = lastStart();
        }
        update();
    }

    function onResize() {
        var newVisible;

        if (window.innerWidth <= BREAKPOINT) {
            newVisible = 1;
        } else {
            newVisible = 3;
        }

        if (newVisible !== visible) {
            visible = newVisible;
            index = 0;
        }
        update();
    }
    btnNext.onclick = next;
    btnPrev.onclick = prev;
    window.onresize = onResize;
    window.onkeydown = function (e) {
        if (e.key === "ArrowRight") {
            next();
        } else if (e.key === "ArrowLeft") {
            prev();
        }
    };

    totalPages.textContent = String(pages());
    update();
}());