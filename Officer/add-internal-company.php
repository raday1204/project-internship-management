<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    // Connect to your database
    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Extract data from the request
    $company_building = $request['company_building'];
    $company_job = $request['company_job'];
    $date_addtraining = $request['date_addtraining'];
    $number_student_train = $request['number_student_train'];

    // Create SQL query for inserting into company table
    $sql_company = "INSERT INTO company 
                    (company_building, company_job)
                    VALUES (?, ?)";

    $stmt_company = $conn->prepare($sql_company);

    if ($stmt_company === false) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt_company->bind_param("ss", $company_building, $company_job);

    if ($stmt_company->execute()) {
        $company_id = $conn->insert_id;

        // Create SQL query for inserting into need_student table
        $sql_need_student = "INSERT INTO need_student 
                             (company_id, date_addtraining, number_student_train) 
                             VALUES (?, ?, ?)";

        $stmt_need_student = $conn->prepare($sql_need_student);

        if ($stmt_need_student === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt_need_student->bind_param("iss", $company_id, $date_addtraining, $number_student_train);

        if ($stmt_need_student->execute()) {
            $response = array("success" => true, "message" => "Data added successfully");
        } else {
            $response = array("success" => false, "message" => "Error adding need_student data: " . $conn->error);
        }

        $stmt_need_student->close();
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