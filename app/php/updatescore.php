<html>
	<body>
		<?php
	
			$con = mysqli_connect("cis.gvsu.edu","zelaskoj","zelaskoj1835", "zelaskoj");
			if (!$con){
				die('Could not connect: '. mysqli_connect_error());
			}
	
			$name = $_POST['name'];
			$score = intval($_POST['score']);
	
			$sql = "INSERT INTO highscores (name, score) VALUES ('$name' , '$score')";
      
      		if($con->query($sql) === TRUE) {
    			echo "New record created successfully.\n";
      		}
    			else{echo "Adding failed!";}
      
      		$con->close();
		?>
		<a href="../index.html">Play Again</a>
		<a href="displayScores.php">View High Scores</a>
	</body>
</html>