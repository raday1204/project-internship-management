<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Handle preflight request (OPTIONS)
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $newCompanyID = $data->company_id;

    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        die(json_encode(array("success" => false, "error" => "Connection failed: " . $conn->connect_error)));
    }

    $username = $conn->real_escape_string($username);

    // Check if the student already exists
    $checkSql = "SELECT users.username, student.student_code, student.company_id , company.company_id
    FROM users 
    LEFT JOIN student ON users.username = student.student_code 
    LEFT JOIN company ON company.company_id = student.company_id
    WHERE student.student_code = '$username'";
    $checkResult = $conn->query($checkSql);

    if ($checkResult && $checkResult->num_rows > 0) {
        // If the student exists, update the company_id
        $updateSql = "UPDATE student SET company_id = '$newCompanyID' WHERE student_code = '$username'";
        if ($conn->query($updateSql) === TRUE) {
            echo json_encode(array("success" => true, "message" => "Company ID updated successfully"));
        } else {
            http_response_code(500);
            echo json_encode(array("success" => false, "error" => "Error updating company ID: " . $conn->error));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("success" => false, "error" => "File not found: " . $_SERVER['PHP_SELF']));
    }

    mysqli_close($conn);
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "error" => "Invalid request method."));
}
?>
