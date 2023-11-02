<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$dbname = "internship_management";

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['year']) && isset($_POST['type_code'])) {
    $year = $_POST['year'];
    $type_code = $_POST['type_code'];


    $sql = "SELECT * FROM company WHERE year = '$year' AND type_code = '$type_code'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $CompanyInformation[] = $row;
        }
    } else {
        $CompanyInformation = [];
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($CompanyInformation);
} else {
    echo json_encode(['error' => 'year and type_code are required']);
}