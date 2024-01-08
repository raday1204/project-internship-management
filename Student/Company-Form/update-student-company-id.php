<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Decode raw JSON data from the request
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error)));
    }

    $conn->set_charset("utf8mb4");

    $company_id = $_POST['company_id'];
    $type_name = $_POST['type_name'];
    $username = $_POST['username'];

    // This is an update operation
    $sql_update_student = "UPDATE student SET company_id = ?, type_name = ? WHERE student_code = ?";
    $stmt_update_student = $conn->prepare($sql_update_student);

    if ($stmt_update_student === false) {
        die(json_encode(array("success" => false, "message" => "Prepare failed: " . $conn->error)));
    }

    $stmt_update_student->bind_param("iss", $company_id, $type_name, $username);

    if ($stmt_update_student->execute()) {
        $response_update_student = array("success" => true, "message" => "Student data updated successfully");

        // Add the SELECT query to retrieve additional information
        $selectSql = "SELECT users.username, student.*
                      FROM users
                      LEFT JOIN student ON users.username = student.student_code
                      WHERE student.student_code = ?";

        $stmt_select_student = $conn->prepare($selectSql);

        if ($stmt_select_student === false) {
            die(json_encode(array("success" => false, "message" => "Prepare failed: " . $conn->error)));
        }

        $stmt_select_student->bind_param("s", $username);
        $stmt_select_student->execute();

        $result = $stmt_select_student->get_result();

        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $response_update_student["data"] = $data;

            // Update the training table
            $newCompanyID = $data['company_id'];

            $updateStatusSql = "UPDATE training SET company_id = '$newCompanyID', company_status = '1' WHERE student_code = '$username'";
            $conn->query($updateStatusSql);

            $updateAssessmentStatusSql = "UPDATE training SET company_id = '$newCompanyID', assessment_status = '1' WHERE student_code = '$username'";
            $conn->query($updateAssessmentStatusSql);
        } else {
            $response_update_student["data"] = null;
        }

        $stmt_select_student->close();
    } else {
        $response_update_student = array("success" => false, "message" => "Error updating student data: " . $stmt_update_student->error);
    }

    $stmt_update_student->close();
    $conn->close();

    echo json_encode($response_update_student);
} else {
    $response_update_student = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response_update_student);
}
?>
