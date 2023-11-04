<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

        // This is for saving company data
        $company_name = $request['company_name'];
        $send_name = $request['send_name'];
        $send_coordinator = $request['send_coordinator'];
        $send_position = $request['send_position'];
        $send_tel = $request['send_tel'];
        $send_email = $request['send_email'];
        $send_mobile = $request['send_mobile'];

        $sql_company = "INSERT INTO company (company_name, send_name, send_coordinator, send_position, send_tel, send_email, send_mobile) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt_company = $conn->prepare($sql_company);

        if ($stmt_company === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt_company->bind_param(
            "sssssss",
            $company_name,
            $send_name,
            $send_coordinator,
            $send_position,
            $send_tel,
            $send_email,
            $send_mobile
        );

        if ($stmt_company->execute()) {
            $company_id = $conn->insert_id;
            $response = array("success" => true, "company_id" => $company_id);
        } else {
            $response = array("success" => false, "message" => "Error adding company data: " . $conn->error);
        }

        $stmt_company->close();

    $conn->close();
} else {
    $response = array("success" => false, "message" => "Invalid request method");
}

echo json_encode($response);
?>
