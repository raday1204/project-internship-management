<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: *");

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
    
    $sql = "SELECT username FROM users WHERE username = '$username'";
    $result = $conn->query($sql);
    
    if ($result) {
        if ($result->num_rows == 1) {
            echo json_encode(['success' => true, 'user' => ['username' => $username]]);
        } else {
            echo json_encode('login failed');
        }
    } else {
        echo json_encode('error query: ' . $conn->error);
    }
}