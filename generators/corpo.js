lists.ratman = ["{corpo_prefix}{corpo_suffix}"];

const pick   = a => a[Math.floor(Math.random() * a.length)];


function roll() {
    document.getElementById("out").textContent = pick(lists.corpo_prefix) + pick(lists.corpo_suffix);
}
roll();