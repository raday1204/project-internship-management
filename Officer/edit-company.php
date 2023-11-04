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

    if (isset($request['company_id'])) {
        $company_id = $request['company_id'];
        $company_name = $request['company_name'];
        $send_name = $request['send_name'];
        $send_coordinator = $request['send_coordinator'];
        $send_position = $request['send_position'];
        $send_tel = $request['send_tel'];
        $send_email = $request['send_email'];
        $send_mobile = $request['send_mobile'];
        $company_building = $request['company_building'];
        $company_job = $request['company_job'];
        $number_student_train = $request['number_student_train'];
        $date_addtraining = $request['date_addtraining'];

        $sql_company = "UPDATE company SET company_name=?, send_name=?, send_coordinator=?, send_position=?, send_tel=?, send_email=?, send_mobile=?, 
            company_building=?, company_job=? WHERE company_id=?";
        $stmt_company = $conn->prepare($sql_company);

        if ($stmt_company === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt_company->bind_param(
            "sssssssssi",
            $company_name,
            $send_name,
            $send_coordinator,
            $send_position,
            $send_tel,
            $send_email,
            $send_mobile,
            $company_building,
            $company_job,
            $company_id
        );

        // Now, let's update the need_student table
        $sql_internal = "UPDATE need_student SET number_student_train=?, date_addtraining=? WHERE company_id=?";
        $stmt_internal = $conn->prepare($sql_internal);
        $stmt_internal->bind_param("ssi", $number_student_train, $date_addtraining, $company_id);

        // Executing the statements
        if ($stmt_company->execute() && $stmt_internal->execute()) {
            $response = array("success" => true);
        } else {
            $response = array("success" => false, "message" => "Error updating data: " . $conn->error);
        }

        $stmt_company->close();
        $stmt_internal->close();
    } else {
        $response = array("success" => true, "message" => "Data not found");
    }

    $conn->close();
} else {
    $response = array("success" => false, "message" => "Invalid request method");
}

echo json_encode($response);
?>