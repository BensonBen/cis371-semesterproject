<!DOCTYPE html>
<html>
<head>
<title>High Scores</title>
<link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="../css/DisplayTable.css" rel="stylesheet" media="screen">
</head>
<body>
<div class="center-text">
<a class="btn btn-success" href="../index.html"><span class="glyphicon glyphicon-arrow-left" ></span>&nbsp; Return to Game</a>
</div>
<div id="table-div">
<table class="table table-striped" width ="%50">


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

$sql = "SELECT * FROM highscores ORDER BY accuracy DESC";

$result = $conn->query($sql);

echo "<thead>";
echo "<tr>";
echo "<th>Rank</th>";
echo "<th>Name</th>" ;
echo "<th>Score</th>" ;
echo "<th>Accuracy</th>" ;
echo "</tr>";
echo "</thead>";
echo "<tbody>";


if ($result->num_rows > 0) {
    // output data of each row
    $rank = 1;
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>".$rank."</td>";
        echo "<td>" .$row['name'] ."</td>";
        echo "<td>" .$row['score'] ."</td>";
        echo "<td>" .$row['accuracy'] ."%"."</td>";
        $rank = $rank +1;
        echo "</tr>";
        }
        echo "</tbody>";
        echo "</table>";
        echo "</div>";
}
$conn->close();
?>
<div class ="button-div">
    <a class="btn btn-success" href="displayScores.php">&nbsp; Sort by High Score &nbsp;<span class="glyphicon glyphicon-repeat"></span></a>
</div>
<script src="http://code.jquery.com/jquery.js"></script>
<script src="../bootstrap/js/bootstrap.min.js"></script>
</div>
</body>
</html>
