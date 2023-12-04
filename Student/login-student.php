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

    $username = $request['username'];
    $username = mysqli_real_escape_string($conn, $username);

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $permission = $row['permission'];

        if ($permission === 'depart') {
            $_SESSION["username"] = $username;
            $response = array("success" => true, "message" => "Login successful");
            $response["loggedInUsername"] = $_SESSION['username'];
        } else {
            $response = array("success" => false, "message" => "Login failed: Insufficient permission");
        }
    } else {
        $response = array("success" => false, "message" => "Login failed: User not found");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}