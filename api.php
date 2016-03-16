

<?php 

  //--------------------------------------------------------------------------
  // Example php script for fetching data from mysql database
  //--------------------------------------------------------------------------
  $host = "localhost";
  $user = "root";
  $pass = "HKiedK";

  $databaseName = "lifehacks";
  $tableName = "hacks";

  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------

//$cat = $_GET['cat'];  

$db =   new mysqli ('localhost', 'root', 'HKiedK', 'lifehacks');

		if ($db->connect_error) 
			{
				die("<p>MySQLi-Verbindungsaufnahme gescheitert: " .$db->connect_error ."</p>");
			}




if ($result = $db->query("SELECT * FROM hacks")) {

    while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
    }
    echo json_encode($myArray);
}

$result->close();
$db->close();

?>