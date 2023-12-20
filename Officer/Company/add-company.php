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
        die("Connection failed: " . $conn->connect_error);
    }

    $year = $_POST['year'];
    $type_name = $_POST['type_name'];
    $term = $_POST['term'];
    $company_name = $_POST['company_name'];
    $send_name = $_POST['send_name'];
    $send_coordinator = $_POST['send_coordinator'];
    $send_position = $_POST['send_position'];
    $send_tel = $_POST['send_tel'];
    $send_email = $_POST['send_email'];
    $send_mobile = $_POST['send_mobile'];
    //แยกเอาไปของ student
    // $type_position = $_POST['type_position'];
    // $type_special = $_POST['type_special'];

    // This is an insert operation
    $sql_insert_company = "INSERT INTO company (year, type_name, term, company_name, 
    send_name, send_coordinator, send_position, send_tel, send_email, send_mobile) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt_insert_company = $conn->prepare($sql_insert_company);

    if ($stmt_insert_company === false) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt_insert_company->bind_param(
        "ssssssssss",
        $year,
        $type_name,
        $term,
        $company_name,
        $send_name,
        $send_coordinator,
        $send_position,
        $send_tel,
        $send_email,
        $send_mobile
    );

    if ($stmt_insert_company->execute()) {
        $company_id = $conn->insert_id;

        $response = array("success" => true, "company_id" => $company_id, "message" => "Company data inserted successfully");
    } else {
        $response = array("success" => false, "message" => "Error adding company data: " . $stmt_insert_company->error);
    }

    $stmt_insert_company->close();

    $conn->close();
} else {
    $response = array("success" => false, "message" => "Invalid request method");
}

echo json_encode($response);
?>
