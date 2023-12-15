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
    $company_id = null;  // Initialize to null, to be fetched

    if (!$username || !$type_code) {
        die(json_encode(array("success" => false, "message" => "Invalid input: username and type_code are required")));
    }

    // Fetch the company_id from the company table
    $sql_select_company_id = "SELECT company_id FROM company WHERE type_code = ?";
    $stmt_select_company_id = $conn->prepare($sql_select_company_id);

    if ($stmt_select_company_id === false) {
        die(json_encode(array("success" => false, "message" => "Prepare failed: " . $conn->error)));
    }

    $stmt_select_company_id->bind_param("s", $type_code);

    if ($stmt_select_company_id->execute()) {
        $stmt_select_company_id->bind_result($fetched_company_id);
        $stmt_select_company_id->fetch();

        if ($fetched_company_id !== null) {
            $company_id = $fetched_company_id;

            // Update the student's company_id in the student table
            $sql_update_student_company_id = "UPDATE student SET company_id = ? WHERE student_code = ?";
            $stmt_update_student_company_id = $conn->prepare($sql_update_student_company_id);

            if ($stmt_update_student_company_id === false) {
                die(json_encode(array("success" => false, "message" => "Prepare failed: " . $conn->error)));
            }

            $stmt_update_student_company_id->bind_param("is", $company_id, $username);

            if ($stmt_update_student_company_id->execute()) {
                $response_update_student = array("success" => true, "message" => "Student's company_id updated successfully");
            } else {
                $response_update_student = array("success" => false, "message" => "Error updating student's company_id: " . $stmt_update_student_company_id->error);
            }

            $stmt_update_student_company_id->close();
        } else {
            $response_update_student = array("success" => false, "message" => "Company not found with type_code: $type_code");
        }
    } else {
        $response_update_student = array("success" => false, "message" => "Error fetching company_id: " . $stmt_select_company_id->error);
    }

    $stmt_select_company_id->close();

    $conn->close();

    echo json_encode($response_update_student);
} else {
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
}
?>