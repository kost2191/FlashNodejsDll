$a = null; 
$b = null; 
$c = null; 
$i = null; 
$max = 1e6; 
$start = microtime(true);   
for ($i =  0; $i < $max; $i++) { 
    $a = 1234 + 5678 + $i; 
    $b = 1234 * 5678 + $i; 
    $c = 1234 / 2 + $i; 
} 
var_dump(microtime(true) - $start); 
