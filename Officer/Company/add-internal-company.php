<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Decode raw JSON data from the request
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

// add-internal-company.php

// ... (headers remain the same)

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error)));
    }

    // Validate and sanitize inputs
    $company_id = isset($_POST['company_id']) ? $conn->real_escape_string($_POST['company_id']) : "";
    $date_addtraining = isset($_POST['date_addtraining']) ? $conn->real_escape_string($_POST['date_addtraining']) : "";
    $number_student_train = isset($_POST['number_student_train']) ? $conn->real_escape_string($_POST['number_student_train']) : "";

    // Insert data into the need_student table
    $sql_insert_need_student = "INSERT INTO need_student (company_id, date_addtraining, number_student_train) VALUES (?, ?, ?)";
    $stmt_insert_need_student = $conn->prepare($sql_insert_need_student);

    if ($stmt_insert_need_student === false) {
        die(json_encode(array("success" => false, "message" => "Prepare failed: " . $conn->error)));
    } else {
        $stmt_insert_need_student->bind_param("iss", $company_id, $date_addtraining, $number_student_train);

        if ($stmt_insert_need_student->execute()) {
            $response = array("success" => true, "message" => "Data inserted into need_student table successfully");
        } else {
            $response = array("success" => false, "message" => "Error adding data to need_student table: " . $stmt_insert_need_student->error);
        }

        $stmt_insert_need_student->close();
    }

    $conn->close();
} else {
    $response = array("success" => false, "message" => "Invalid request method");
    http_response_code(400);
}

echo json_encode($response);
?>
