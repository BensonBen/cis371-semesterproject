<?php 
	$con = mysql_connect("cis.gvsu.edu","zelaskoj","zelaskoj1835");
	if (!$con){
		die('Could not connect: '. mysql_error());
	}
	mysql_selectdb("zelaskoj", $con);
	$ret = "";
	$qry = mysql_query("SELECT username FROM cis371_login WHERE username =".$_POST["username"].";");
	if ($qry == ""){
		$ret = "Username not found!";
		echo $ret;
	}
	$qry = mysql_query("SELECT password FROM cis371_login WHERE 
		password =".$_POST["pwd"].";");
	if ($qry == ""){
		$ret = "Incorrect password!";
	} 
	else $ret = "Login successful!";
	echo $ret;
?>