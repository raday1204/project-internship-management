<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$dbname = "internship_management";

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['company_id'])) {
    $company_id = $_GET['company_id'];

    // Query to fetch company data
    $sql_company = "SELECT * FROM company WHERE company_id = ?";
    $stmt_company = $conn->prepare($sql_company);
    $stmt_company->bind_param("i", $company_id);

    if ($stmt_company->execute()) {
        $result = $stmt_company->get_result();
        $company_data = $result->fetch_assoc();
    } else {
        $response = array("success" => false, "message" => "Error fetching company data: " . $conn->error);
        echo json_encode($response);
        exit();
    }

    // Query to fetch need_student data
    $sql_internal = "SELECT * FROM need_student WHERE company_id = ?";
    $stmt_internal = $conn->prepare($sql_internal);
    $stmt_internal->bind_param("i", $company_id);

    if ($stmt_internal->execute()) {
        $result = $stmt_internal->get_result();
        $need_student_data = $result->fetch_assoc();
    } else {
        $response = array("success" => false, "message" => "Error fetching need_student data: " . $conn->error);
        echo json_encode($response);
        exit();
    }

    $response = array(
        "success" => true,
        "data" => $company_data,
        "need_student" => $need_student_data ? $need_student_data : [] // Check if data exists, return an empty array if it doesn't
    );

    echo json_encode($response);
} else {
    $response = array("success" => false, "message" => "Invalid request data");
    echo json_encode($response);
}

$conn->close();
?>
