<?php 
 
//  $secteur = file_get_contents('php://input');
 $bdd = mysqli_connect('127.0.0.1','drpnngev_ludo','q!2R(O9EJss6i0','drpnngev_velo'); 
if (!$bdd) { 
die('Could not connect to MySQL: ' . mysql_error()); 
} 

$reponse=mysqli_query($bdd,'SELECT * FROM parcours');
$data=array();
while($row=$reponse->fetch_assoc()){
array_push($data,$row);

} 

header('Content-Type: application/json');
echo json_encode($data);
exit();


?>

<!-- 
global $conn;
		$query = "SELECT * FROM produit";
		$response = array();
		$result = mysqli_query($conn, $query);
		while($row = mysqli_fetch_array($result))
		{
			$response[] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($response, JSON_PRETTY_PRINT); -->