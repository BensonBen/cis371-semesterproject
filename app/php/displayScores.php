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

$result = $conn->query($sql);

echo "<div>";
echo "<table>";
echo "<caption>High Scores</caption>";
echo "<thead>";
echo "<tr>";
echo "<th>Name</th>" ;
echo "<th>Score</th>" ;
echo "</tr>";
echo "</thead>";
echo "<tbody>";

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" .$row['name'] ."</td>";
        echo "<td>" .$row['score'] ."</td>";
        echo "</tr>";
        }
        echo "</tbody>";
        echo "</table>";
        echo "</div>";
} else 
    echo "0 results";
}
$conn->close();
?>