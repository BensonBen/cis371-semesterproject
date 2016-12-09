<html>
	<head>
		<title>Menu</title>
		<link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="../css/style.css" rel="stylesheet" media="screen">
	</head>
	<body>
		
		<?php
	
			$con = mysqli_connect("cis.gvsu.edu","zelaskoj","zelaskoj1835", "zelaskoj");
			if (!$con){
				die('Could not connect: '. mysqli_connect_error());
			}
	
			$name = $_POST['name'];
			$score = intval($_POST['score']);
			$accuracy = floatval($_POST['accuracy']);
	
			$sql = "INSERT INTO highscores (name, score, accuracy) VALUES ('$name' , '$score', '$accuracy')";
      
      		if($con->query($sql) === TRUE) {
      		}
    			else{echo "Adding failed!";}
      
      		$con->close();
		?>
		<div class ="center-everything">
			<p class="thanks">Thanks for playing!</p>
			<a class="btn btn-success" href="../index.html"><span class="glyphicon glyphicon-arrow-left" ></span>&nbsp; Return to Game</a>
       		 	<a class="btn btn-success" href="displayScores.php"> View High Scores &nbsp;<span class="glyphicon glyphicon-arrow-right"></span></a>
    		</div>
	</body>
</html>
