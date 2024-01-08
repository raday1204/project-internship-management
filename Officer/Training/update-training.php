<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
    }

    $conn->set_charset("utf8mb4");

    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->studentCode)) {
        $studentCode = $conn->real_escape_string($data->studentCode);

        if (isset($data->newStatus)) {
            $newStatus = $conn->real_escape_string($data->newStatus);
            $sqlCompanyStatus = "UPDATE training SET company_status = '$newStatus' WHERE student_code = '$studentCode'";
            if (!$conn->query($sqlCompanyStatus)) {
                die(json_encode(array("error" => "Error updating company status: " . $conn->error)));
            }
        }

        if (isset($data->newAssessmentStatus)) {
            $newAssessmentStatus = $conn->real_escape_string($data->newAssessmentStatus);
            $sqlAssessmentStatus = "UPDATE training SET assessment_status = '$newAssessmentStatus' WHERE student_code = '$studentCode'";
            if (!$conn->query($sqlAssessmentStatus)) {
                die(json_encode(array("error" => "Error updating assessment status: " . $conn->error)));
            }
        }        
        echo json_encode(array("success" => true, "studentCode" => $studentCode));
    } else {
        echo json_encode(array("error" => "Invalid input data."));
    }

    // Close the connection
    $conn->close();
} else {
    echo json_encode(array("error" => "Invalid request method."));
}
?>