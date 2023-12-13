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
    // Sanitize and validate input
    $year = mysqli_real_escape_string($conn, $_POST['year']);
    $type_code = mysqli_real_escape_string($conn, $_POST['type_code']);

    // Initialize response array
    $response = [];

    // Retrieve company information
    $sqlCompany = "SELECT * FROM company WHERE year = ? AND type_code = ?";
    $stmtCompany = $conn->prepare($sqlCompany);
    $stmtCompany->bind_param("ss", $year, $type_code);

    if ($stmtCompany->execute()) {
        $resultCompany = $stmtCompany->get_result();

        if ($resultCompany->num_rows > 0) {
            while ($rowCompany = $resultCompany->fetch_assoc()) {
                $companyInformation['company'][] = $rowCompany;

                // Retrieve corresponding information from need_student table
                $company_id = $rowCompany['company_id'];
                $sqlNeedStudent = "SELECT * FROM need_student WHERE company_id = ?";
                $stmtNeedStudent = $conn->prepare($sqlNeedStudent);
                $stmtNeedStudent->bind_param("i", $company_id);

                if ($stmtNeedStudent->execute()) {
                    $resultNeedStudent = $stmtNeedStudent->get_result();

                    if ($resultNeedStudent->num_rows > 0) {
                        while ($rowNeedStudent = $resultNeedStudent->fetch_assoc()) {
                            $companyInformation['need_student'][] = $rowNeedStudent;
                        }
                    }
                } else {
                    $response['error'] = "Error fetching need_student data: " . $stmtNeedStudent->error;
                }
            }
        } else {
            $response['error'] = "No data found for the specified parameters";
        }
    } else {
        $response['error'] = "Error fetching company data: " . $stmtCompany->error;
    }

    $stmtCompany->close();
    $stmtNeedStudent->close();

    $conn->close();

    // Output the response
    echo json_encode($companyInformation);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
