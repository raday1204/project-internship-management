<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$response = array();

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

    $conn->set_charset("utf8mb4");

    // Assuming you're passing the username in the request
    $username = $request['username'];
    $username = mysqli_real_escape_string($conn, $username);

    // Use the received username to fetch user-specific data
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION['username'] = $row['username'];
        $response = [
            'loggedIn' => true,
            'username' => $_SESSION['username']
        ];
    } else {
        $response = [
            'loggedIn' => false
        ];
    }

    echo json_encode($response);
}
?>