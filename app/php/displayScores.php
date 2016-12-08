<?php
$servername = "cis.gvsu.edu";
$username = "zelaskoj";
$password = "zelaskoj1835";
$dbname = "zelaskoj";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM highscores ORDER BY scores DESC";
mysql_selectdb($dbname);
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["name"]. "	" . $row["score"]. "<br>";
    }
} else 
    echo "0 results";
}

mysqli_close($conn);
?>