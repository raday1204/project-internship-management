<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$dbname = "internship_management";

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get form data
    $year = $_POST['year'];
    $type_code = $_POST['type_code'];

    // Retrieve company information
    $companyInformation = [];

    $sqlCompany = "SELECT * FROM company WHERE year = '$year' AND type_code = '$type_code'";
    $resultCompany = $conn->query($sqlCompany);

    if ($resultCompany) {
        if ($resultCompany->num_rows > 0) {
            while ($rowCompany = $resultCompany->fetch_assoc()) {
                $companyInformation['company'][] = $rowCompany;

                // Retrieve corresponding information from need_student table
                $company_id = $rowCompany['company_id'];
                $sqlNeedStudent = "SELECT * FROM need_student WHERE company_id = '$company_id'";
                $resultNeedStudent = $conn->query($sqlNeedStudent);

                if ($resultNeedStudent && $resultNeedStudent->num_rows > 0) {
                    while ($rowNeedStudent = $resultNeedStudent->fetch_assoc()) {
                        $companyInformation['need_student'][] = $rowNeedStudent;
                    }
                }
            }
        }
    }

    $conn->close();

    echo json_encode($companyInformation);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
