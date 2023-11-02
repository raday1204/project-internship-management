<?php
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
        $response = array("success" => false, "message" => "Connection failed: " . $conn->connect_error);
    } else {
        $username = $request['username'];
        $username = mysqli_real_escape_string($conn, $username);

        $sql = "SELECT * FROM users WHERE username = '$username'";
        $result = $conn->query($sql);

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            session_start();
            $_SESSION['username'] = $user['username'];

            $response = array("success" => true, "message" => "Login success", "user" => $user);
        } else {
            $response = array("success" => false, "error" => "User not logged in.");
        }
    }
}
echo json_encode($response);
?>