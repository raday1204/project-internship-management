<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $username = $request['username'];

    $username = mysqli_real_escape_string($conn, $username);
    
    $sql = "SELECT COUNT(*) FROM users WHERE username = '$username'";
    $result = $conn->query($sql);
    
    if ($result) {
        if ($result->num_rows == 1) {
            echo json_encode('login success');
        } else {
            echo json_encode('login failed');
        }
    } else {
        $response = array("success" => false, "message" => "Login failed");
    }

    // Send a JSON response back to the Angular application
    header('Content-Type: application/json');
    echo json_encode($response);

    $conn->close(); // Close the connection using $conn
}
?>
