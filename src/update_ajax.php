<?php

if($_POST['id'])
{
    include("database.php");
    $id=mysql_escape_String($_POST['id']);
    $field=mysql_escape_String($_POST['field']);
    $value=mysql_escape_String($_POST['value']);
 
    $sql = "update user set $field='$value' where id='$id'";
 
    mysql_query($sql);
    echo mysql_error($sql);
}

?>