<?php 
	$con = mysql_connect("cis.gvsu.edu","zelaskoj","zelaskoj1835");
	if (!$con){
		die('Could not connect: '. mysql_error());
	}
	
	$name = $_POST['name'];
	$score = $_POST['score'];
	$sql = 'INSERT INTO highscores '.
      '(name, score) '.
      'VALUES ('$name', '$score')';
      
      mysql_selectdb("zelaskoj", $con);
      $retval = mysql_query( $sql, $conn );
      
      if(! $retval ) {
    	die ('Could not enter data: ' . mysql_error());
      }
      
      echo "High score table updated!\n";
      
      mysql_close($con);
?>