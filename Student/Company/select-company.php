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

    if (!isset($data->username) || !isset($data->company_id)) {
        http_response_code(400);
        echo json_encode(array("success" => false, "error" => "Invalid request data.", "requestData" => $data));
        exit();
    }

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

    $conn->set_charset("utf8mb4");
    $username = $conn->real_escape_string($username);

    // Start a transaction
    $conn->begin_transaction();

    try {
        // Check if the student already exists
        $checkSql = "SELECT users.username, student.student_code, student.company_id, training.*
        FROM users 
        LEFT JOIN student ON users.username = student.student_code 
        LEFT JOIN training ON training.student_code = student.student_code
        WHERE student.student_code = '$username' FOR UPDATE";  // Lock the selected rows for update

        $checkResult = $conn->query($checkSql);

        if ($checkResult && $checkResult->num_rows > 0) {

            // Check if the username already exists in the training table
            $checkUsernameSql = "SELECT * FROM training WHERE student_code = '$username'";
            $checkUsernameResult = $conn->query($checkUsernameSql);

            if ($checkUsernameResult && $checkUsernameResult->num_rows == 0) {
                // If the student exists and username is not in the training table, insert the username
                $insertUsernameSql = "INSERT INTO training (student_code) VALUES ('$username')";
                $conn->query($insertUsernameSql);
            }

            // Update the company_id and status
            $updateSql = "UPDATE student SET company_id = '$newCompanyID' WHERE student_code = '$username'";
            $conn->query($updateSql);

            $updateStatusSql = "UPDATE training SET company_id = '$newCompanyID', company_status = '1' WHERE student_code = '$username'";
            $conn->query($updateStatusSql);

            $updateAssessmentStatusSql = "UPDATE training SET company_id = '$newCompanyID', assessment_status = '1' WHERE student_code = '$username'";
            $conn->query($updateAssessmentStatusSql);

            // Commit the transaction if all queries are successful
            $conn->commit();

            echo json_encode(array("success" => true, "message" => "Company ID, status, and username inserted/updated successfully"));
        } else {
            http_response_code(404);
            echo json_encode(array("success" => false, "error" => "Student not found for this user. username: $username"));
        }
    } catch (Exception $e) {
        // An error occurred, rollback the transaction
        $conn->rollback();

        http_response_code(500);
        echo json_encode(array("success" => false, "error" => "Transaction failed: " . $e->getMessage()));
    }

    mysqli_close($conn);
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "error" => "Invalid request method."));
}
?>
