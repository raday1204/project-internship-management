<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

if (isset($_SESSION["username"]) || isset($_GET["username"])) {
    $username = isset($_SESSION["username"]) ? $_SESSION["username"] : $_GET["username"];

    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
    }

    $conn->set_charset("utf8mb4");

    $username = $conn->real_escape_string($username);

    $sql = "SELECT users.username, company.company_id, company.company_name, company.company_building, training.*
            FROM users 
            LEFT JOIN student ON users.username = student.student_code 
            LEFT JOIN company ON student.company_id = company.company_id
            LEFT JOIN training ON student.company_id = training.company_id
            WHERE users.username = '$username'";

    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
        $row = $result->fetch_assoc();

        $response = array(
            'success' => true,
            'data' => array(
                'company_id' => $row['company_id'],
                'company_name' => $row['company_name'],
                'company_building' => $row['company_building']
            )
        );

        echo json_encode($response);
    } else {
        echo json_encode(array("error" => "No student data found for this user."));
    }

    mysqli_close($conn);
} else {
    echo json_encode(array("error" => "No username provided."));
}
?>
