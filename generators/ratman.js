//lists.ratman = ["{ratman_prefix}{ratman_suffix}"];

//const pick   = a => a[Math.floor(Math.random() * a.length)];


function ratman_out() {
    
const prefix       = pick(lists.ratman_prefix);
const suffixIf     = Math.floor(Math.random() * 100);
const suffixFirst  = pick(lists.ratman_suffix);
const suffixSecond = pick(lists.ratman_suffix);
let name;
if (suffixIf === 98) {
        name = prefix;                                  // no suffix
    } else if (suffixIf === 99) {
        name = prefix + suffixFirst + suffixSecond;     // two suffixes
    } else {
        name = prefix + suffixFirst;                    // one suffix
    }


    document.getElementById("out").textContent = name;
}
//ratman_out();