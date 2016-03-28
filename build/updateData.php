<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ajax Datenbank Update</title>
	<script type="text/javascript"
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js">
	</script>

	<script type="text/javascript">
	    $(document).ready(function()
	    {
		$(".edit_tr").click(function()
		{
		    var ID=$(this).attr('id');
		    $("#label_"+ID).hide();
		    $("#pen_"+ID).hide();
		    $("#input_"+ID).show();
		}).change(function()
		{
		    var ID = $(this).attr('id');
		    var IID = document.getElementById("iid").value;
		    var data=$("#input_"+ID).val();
		   	debugger;
		    var dataString = 'id=' + IID + '&field=' + ID + '&value=' + data;


		    $.ajax({
			type: "POST",
			url: "update_ajax.php",
			data: dataString,
			cache: false,
			success: function(html)
			{
			    $("#label_"+ID).html(data);
			    document.getElementById("pen_"+ID).src="images/h4_span.png";
			    document.getElementById("pen_"+ID).width="23";
			},
			error: function(data)
			{
			    alert("Es ist ein Fehler aufgetreten!");
			}
		    });

		});

		// Klick innerhalb des Labels
		$(".editbox").mouseup(function()
		{
		    return false
		});
		// Klick auserhalb des Inputfeldes
		$(document).mouseup(function()
		{
		    $(".editbox").hide();
		    $(".text").show();
		    $(".pen").show();
		});
	    });
	</script>
	<link type="text/css" href="style.css" rel="stylesheet" />
    </head>
    <body>
	<?php
//Datenbankverbindung herstellen und Datenbank auswählen
	include("database.php");

	$submitId = $_POST['userId'];
	echo "<h4>Sie haben die Benutzer ID: " . $submitId . " gewählt </h4><br/>";

//SQL Query vorbereiten und absenden
	$sql_view = "SELECT * FROM user where id=$submitId ";
	$view = mysql_query($sql_view);

//Ergebniss ausgeben
	$user = mysql_fetch_object($view);
	?>
	<table class="edit_tab" id="edit_tab">

	    <input type="hidden" value="<?php echo $submitId ?>" id="iid" />

	    <!--Zeile für den Vornamen-->
	    <tr class="edit_tr odd" id="vorname">
		<td>Vorname:</td>
		<td>
		    <span id="label_vorname" class="text">
			<?php echo $user->vorname; ?>
		    </span>
		    <input type="text" value="<?php echo $user->vorname; ?>"
			   class="editbox" id="input_vorname" />
		</td>
		<td class="edit_pen">
		    <img src="images/edit.png" class="pen" id="pen_vorname" />
		</td>
	    </tr>

	    <!-- Zeile für den Nachnamen -->
	    <tr class="edit_tr" id="nachname">
		<td>Nachname:</td>
		<td>
		    <span id="label_nachname" class="text">
			<?php echo $user->nachname; ?>
		    </span>
		    <input type="text" value="<?php echo $user->nachname; ?>"
			   class="editbox" id="input_nachname" />
		</td>
		<td class="edit_pen">
		    <img src="images/edit.png" class="pen" id="pen_nachname" />
		</td>
	    </tr>

	</table>
	<div style="width:320px; margin: auto; color: #999999; font-size: 85%; margin-top: 30px;">
	Mit freundlicher Unterstützung - <a href="www.hurm-it.de/blog" alt="Hurm IT Blog">www.hurm-it.de/blog</a>
	</div>
    </body>
</html>
