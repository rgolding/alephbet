<?php
//Set variables
$servername = "localhost";
$username = "rgolding";
$password = "";
$dbname = "c9";

// Create connection

$con=mysqli_connect($servername, $username, $password, $dbname);
// INSERT INTO `c9`.`userRegistration` (`username`, `classID`, `password`) VALUES ('test', '0', 'test');
//Set up ID Query
$sqlID = "INSERT into userRegistration (username, classID, password) VALUES ('" . $_GET["username"] . "', '" . $_GET["classID"] . "','" . $_GET["password"] . "' )
WHERE (username = '" . $_GET["username"] . "' AND password = '" . $_GET["password"] . "') " ;
//Run ID Query
$resultsID = mysqli_query($con, $sqlID);


// Check connection
if (mysqli_num_rows($resultsID) == 0) {
        echo "Fail";
        exit;
    
} else {
        // $sqlCorp = "SELECT * FROM corp WHERE USERNAME = '" .$_GET["username"] . "'";
        // $resultsCorp = mysqli_query($con, $sqlCorp);
        // if (mysqli_num_rows($resultsCorp) > 1){
        //         $jsObj = "[";
        //         while($row = mysqli_fetch_assoc($resultsCorp)) {
        //                 $jsObj .= '{';
        //                 //$jsObj .= '"id": "' . $row['ID'] . '",';
        //                 $jsObj .= '"username": "' . $row['username'] . '",';
        //                 $jsObj .= '"corpname": "' . $row['corpname'] . '",';
        //                 $jsObj .= '"corpsymbol": "' . $row['corpsymbol'] . '"';            
        //                 $jsObj .= '},';
        //         }
        //         $jsObj[ strlen($jsObj)-1 ] = "]";
        //         echo $jsObj;
        // }
        echo "Connection Successful!";
        exit;
  }

 mysqli_close($con)
 
 
?>

