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

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $year = mysqli_real_escape_string($conn, $_GET['year']);
    $type_code = mysqli_real_escape_string($conn, $_GET['type_code']);

    // Initialize response array
    $response = [];

    // Retrieve company information using prepared statement
    $sqlCompany = "SELECT company_id, company_name, company_building FROM company WHERE year = ? AND type_code = ?";
    $stmtCompany = $conn->prepare($sqlCompany);
    $stmtCompany->bind_param("ss", $year, $type_code);

    if ($stmtCompany->execute()) {
        $resultCompany = $stmtCompany->get_result();

        if ($resultCompany->num_rows > 0) {
            while ($rowCompany = $resultCompany->fetch_assoc()) {
                $company_id = $rowCompany['company_id'];

                // Retrieve information from the student table using prepared statement
                $stmtStudents = $conn->prepare("SELECT student_code, student_name, student_lastname FROM student WHERE company_id = ?");
                $stmtStudents->bind_param("s", $company_id);
                $stmtStudents->execute();
                $resultStudents = $stmtStudents->get_result();
                $students = fetchRecords($resultStudents);

                // Retrieve information from the need_student table using prepared statement
                $stmtNeedStudents = $conn->prepare("SELECT * FROM need_student WHERE company_id = ?");
                $stmtNeedStudents->bind_param("s", $company_id);
                $stmtNeedStudents->execute();
                $resultNeedStudents = $stmtNeedStudents->get_result();
                $needStudent = fetchRecords($resultNeedStudents);

                $response[] = [
                    'company' => $rowCompany,
                    'students' => $students,
                    'need_student' => $needStudent
                ];
            }
        } else {
            $response['error'] = "No data found for the specified parameters";
        }
    } else {
        $response['error'] = "Error executing the prepared statement";
    }

    $stmtCompany->close();
    $conn->close();

    // Output the response
    echo json_encode(['success' => true, 'data' => $response]); // Include 'success' key and wrap data in 'data' key
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

function fetchRecords($result) {
    $records = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
    }

    return $records;
}
?>