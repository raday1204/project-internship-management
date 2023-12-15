<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error)));
    }

    $type_code = $_POST['type_code'];
    $username = $_POST['username'];

    $sqlUpdateCompany = "UPDATE company SET type_code = '$type_code' WHERE username = '$username'";


    if (mysqli_query($conn, $sqlUpdateCompany)) {
        $responseUpdateCompany = [
            'success' => true,
            'message' => 'Company type_code updated successfully.',
        ];
    } else {
        $responseUpdateCompany = [
            'success' => false,
            'message' => 'Error updating company type_code: ' . mysqli_error($conn)
        ];
    }

    echo json_encode($responseUpdateCompany);

} else {
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
}
?>