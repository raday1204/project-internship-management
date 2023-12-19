<?php
session_start();

// Allow only your Angular application's origin
$allowedOrigin = 'http://localhost:4200';  // Update with your Angular app's URL
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

if (isset($_POST["username"])) {
    $username = $_POST["username"];

    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
    }

    $username = $conn->real_escape_string($username);

    $sql = "SELECT users.username, student.*, company.*, training.status
    FROM users 
    LEFT JOIN student ON users.username = student.student_code 
    LEFT JOIN company ON company.company_id = student.company_id
    LEFT JOIN training ON training.company_id = student.company_id
    WHERE student.student_code = '$username'";

    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
        $row = $result->fetch_assoc();

        $response = [
            'success' => true,
            'data' => [
                'username' => $row['username'],
                'company_id' => $row['company_id'],
                'student_code' => $row['student_code'],
                'student_name' => $row['student_name'],
                'student_lastname' => $row['student_lastname'],
                'company' => [
                    'company_id' => $row['company_id'],
                    'company_name' => $row['company_name'],
                    'company_building' => $row['company_building'],
                    'status' => $row['status']
                ]
            ]
        ];
        echo json_encode($response);
    } else {
        echo json_encode(array("error" => "No student data found for this user."));
    }

    mysqli_close($conn);
} else {
    echo json_encode(array("error" => "No username provided."));
}
?>
