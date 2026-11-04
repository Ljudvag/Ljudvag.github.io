lists.ratman = ["{ratman_prefix}{ratman_suffix}"];

const pick   = a => a[Math.floor(Math.random() * a.length)];


function roll() {
    document.getElementById("out").textContent = pick(lists.ratman_prefix) + pick(lists.ratman_suffix);
}
roll();