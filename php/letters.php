<?php
//Set variables
$servername = "localhost";
$username = "rgolding";
$password = "";
$dbname = "c9";

// Create connection

$con=mysqli_connect($servername, $username, $password, $dbname);

//Set up ID Query
$sqlID = "SELECT * FROM letters " ;
//Run ID Query
$letters = mysqli_query($con, $sqlID);


// Check connection
if (mysqli_num_rows($letters) == 0) {
    echo "Fail";
    exit;
    
} else {

    if (mysqli_num_rows($letters) > 1){
        $jsObj = "[";
        while($row = mysqli_fetch_assoc($letters)) {
            $jsObj .= '{';
            //$jsObj .= '"id": "' . $row['ID'] . '",';
            $jsObj .= '"hebrew": "' . $row['hebrew'] . '",';
            $jsObj .= '"sound": "' . $row['sound'] . '",';
            $jsObj .= '"english": "' . $row['english'] . '"';            
            $jsObj .= '},';
        }
        $jsObj[ strlen($jsObj)-1 ] = "]";
        echo $jsObj;
    }
  }

 mysqli_close($con)
 
 
?>

