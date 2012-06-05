var i, a, b, c, max; 
max = 1e6; 
console.time('maths');   
for (i =  0; i < max; i++) { 
    a = 1234 + 5678 + i; 
    b = 1234 * 5678 + i; 
    c = 1234 / 2 + i; 
}   
console.timeEnd('maths'); 
