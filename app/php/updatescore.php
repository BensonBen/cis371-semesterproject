<html>
	<head>
		<title>Menu</title>
		<link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
	</head>
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
    			echo "Thanks for playing!";
      		}
    			else{echo "Adding failed!";}
      
      		$con->close();
		?>
		<div class ="row center-text">
			<a class="btn btn-success" href="../index.html"><span class="glyphicon glyphicon-arrow-left" ></span>&nbsp; Return to Game</a>
       		 	<a class="btn btn-success" href="php/displayScores.php"> View High Scores<span class="glyphicon glyphicon-arrow-right"></span></a>
    		</div>
	</body>
</html>
