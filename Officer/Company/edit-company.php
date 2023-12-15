<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$response = array(); // Initialize response

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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $company_id = $_GET['$company_id'];
        $updateFields = array();

        if (isset($_POST['company_name'])) {
            $updateFields[] = "company_name = '" . $_POST['company_name'] . "'";
        }
        if (isset($_POST['send_name'])) {
            $updateFields[] = "send_name = '" . $_POST['send_name'] . "'";
        }
        
        if (isset($_POST['send_coordinator'])) {
            $updateFields[] = "send_coordinator = '" . $_POST['send_coordinator'] . "'";
        }
        
        if (isset($_POST['send_position'])) {
            $updateFields[] = "send_position = '" . $_POST['send_position'] . "'";
        }
        
        if (isset($_POST['send_tel'])) {
            $updateFields[] = "send_tel = '" . $_POST['send_tel'] . "'";
        }
        
        if (isset($_POST['send_email'])) {
            $updateFields[] = "send_email = '" . $_POST['send_email'] . "'";
        }
        
        if (isset($_POST['send_mobile'])) {
            $updateFields[] = "send_mobile = '" . $_POST['send_mobile'] . "'";
        }
        
        if (isset($_POST['company_building'])) {
            $updateFields[] = "company_building = '" . $_POST['company_building'] . "'";
        }
        
        if (isset($_POST['company_job'])) {
            $updateFields[] = "company_job = '" . $_POST['company_job'] . "'";
        }
        
        if (isset($_POST['number_student_train'])) {
            $updateFields[] = "number_student_train = '" . $_POST['number_student_train'] . "'";
        }
        
        if (isset($_POST['date_addtraining'])) {
            $updateFields[] = "date_addtraining = '" . $_POST['date_addtraining'] . "'";
        }
        
        // $send_name = $request['send_name'];
        // $send_coordinator = $request['send_coordinator'];
        // $send_position = $request['send_position'];
        // $send_tel = $request['send_tel'];
        // $send_email = $request['send_email'];
        // $send_mobile = $request['send_mobile'];
        // $company_building = $request['company_building'];
        // $company_job = $request['company_job'];
        // $number_student_train = $request['number_student_train'];
        // $date_addtraining = $request['date_addtraining'];
        $updateFieldsStr = implode(", ", $updateFields);
        $sql_company = "UPDATE company SET $updateFieldsStr WHERE company_id=$company_id";
        $stmt_company = $conn->prepare($sql_company);
    
        if ($stmt_company === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt_company->bind_param("i", $company_id);
    
        $sql_internal = "UPDATE need_student SET 
            number_student_train = COALESCE(?, number_student_train),
            date_addtraining = COALESCE(?, date_addtraining)
            WHERE company_id=?";
        $stmt_internal = $conn->prepare($sql_internal);
        $stmt_internal->bind_param("ssi", $request['number_student_train'], $request['date_addtraining'], $company_id);
    
        if ($stmt_company->execute() && $stmt_internal->execute()) {
            $rows = $stmt_company->affected_rows;
            if ($rows > 0) {
                $response = array("success" => true);
            } else {
                $response = array("success" => false, "message" => "Company data not found");
            }
        } else {
            $response = array("success" => false, "message" => "Error updating company data: " . $conn->error);
        }

        $stmt_company->close();
        $stmt_internal->close();
    } else {
        $response = array("success" => false, "message" => "Company ID not provided");
    }
}

// Close the database connection outside the if statement
$conn->close();

echo json_encode($response);
?>
