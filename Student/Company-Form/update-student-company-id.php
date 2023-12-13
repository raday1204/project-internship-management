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

    $username = isset($data['username']) ? $data['username'] : null;
    $type_code = isset($data['type_code']) ? $data['type_code'] : null;
    $company_id = isset($data['company_id']) ? $data['company_id'] : null;
    if (!$username || !$type_code || !$company_id) {
        die(json_encode(array("success" => false, "message" => "Invalid input: username, company_id, and type_code are required")));
    }

    // Update the student's company_id and type_code in the student table
    $sql_update_student_company_id = "UPDATE student SET type_code = ?, company_id = ? WHERE student_code = ?";
    $stmt_update_student_company_id = $conn->prepare($sql_update_student_company_id);

    if ($stmt_update_student_company_id === false) {
        die(json_encode(array("success" => false, "message" => "Prepare failed: " . $conn->error)));
    }

    $stmt_update_student_company_id->bind_param("sii", $type_code, $company_id, $username);

    if ($stmt_update_student_company_id->execute()) {
        $response_update_student = array("success" => true, "message" => "Student's company_id and type_code updated successfully");
    } else {
        $response_update_student = array("success" => false, "message" => "Error updating student's company_id and type_code: " . $stmt_update_student_company_id->error);
    }

    $stmt_update_student_company_id->close();

    $conn->close();

    echo json_encode($response_update_student);
} else {
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
}
?>