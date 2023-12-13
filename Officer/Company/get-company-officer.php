<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$hostAuth = "localhost";
$userAuth = "root";
$passAuth = "";
$dbname = "internship_management";

$conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if company_id is provided in the query parameters
if (isset($_GET['company_id'])) {
    // Retrieve company data based on company_id

    // Sanitize input to prevent SQL injection
    $company_id = mysqli_real_escape_string($conn, $_GET['company_id']);
    $sql_get_company = "SELECT * FROM company WHERE year = ? AND type_code = ?";
    $stmt_get_company = $conn->prepare($sql_get_company);

    if ($stmt_get_company === false) {
        $response = array("success" => false, "message" => "Prepare failed: " . $conn->error);
    } else {
        $stmt_get_company->bind_param("ss", $year, $type_code);

        if ($stmt_get_company->execute()) {
            $result = $stmt_get_company->get_result();

            if ($result->num_rows > 0) {
                $data = array();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                $response = array("success" => true, "message" => "Company data retrieved successfully", "company" => $data);
            } else {
                $response = array("success" => false, "message" => "No data found for the specified parameters");
            }
        } else {
            $response = array("success" => false, "message" => "Error fetching company data: " . $stmt_get_company->error);
        }

        $stmt_get_company->close();
    }
} else {
    // Fetch distinct values from the company table
    $sql = "SELECT DISTINCT year, type_code, term, company_name, company_building FROM company";
    $result = $conn->query($sql);
    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    // Return the data array even if it's empty
    $response = $data;
}

echo json_encode($response);

$conn->close();
?>
