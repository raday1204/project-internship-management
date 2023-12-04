<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        $response = array("success" => false, "message" => "Connection failed: " . $conn->connect_error);
        http_response_code(500);
        echo json_encode($response);
        exit();
    }

    $company_id = $_POST['company_id'];
    $company_building = $_POST['company_building'];
    $company_job = $_POST['company_job'];

    // This is an update operation
    $sql_update_company = "UPDATE company SET company_building = ?, company_job = ? WHERE company_id = ?";
    $stmt_update_company = $conn->prepare($sql_update_company);

    if ($stmt_update_company === false) {
        $response = array("success" => false, "message" => "Prepare failed: " . $conn->error);
        http_response_code(500);
        echo json_encode($response);
        exit();
    }

    $stmt_update_company->bind_param("ssi", $company_building, $company_job, $company_id);

    if ($stmt_update_company->execute()) {
        $response = array("success" => true, "message" => "Company data updated successfully");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "Error updating data in company table: " . $stmt_update_company->error);
        http_response_code(500);
        echo json_encode($response);
    }

    $stmt_update_company->close();
    $conn->close();
} else {
    $response = array("success" => false, "message" => "Invalid request method");
    http_response_code(400);
    echo json_encode($response);
}
?>
