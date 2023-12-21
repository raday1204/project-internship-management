<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

if (isset($_SESSION["username"]) || isset($_GET["username"])) {

    $username = isset($_SESSION["username"]) ? $_SESSION["username"] : $_GET["username"];

    $hostAuth = "localhost";
    $userAuth = "root";
    $passAuth = "";
    $dbname = "internship_management";

    $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
    }

    $username = $conn->real_escape_string($username);

    $sql = "SELECT users.username, student.*, company.*, need_student.*
            FROM users 
            LEFT JOIN student ON users.username = student.student_code 
            LEFT JOIN company ON company.company_id = student.company_id
            LEFT JOIN need_student ON need_student.company_id = student.company_id
            WHERE student.student_code = '$username'";

    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
        $row = $result->fetch_assoc();

        $response = [
            'success' => true,
            'data' => [
                'username' => $row['username'],
                'student_code' => $row['student_code'],
                'student_name' => $row['student_name'],
                'student_lastname' => $row['student_lastname'],
                'depart_code' => $row['depart_code'],
                'student_pak' => $row['student_pak'],
                'student_mobile' => $row['student_mobile'],
                'student_facebook' => $row['student_facebook'],
                'company' => [
                    'company_id' => $row['company_id'],
                    'year' => $row['year'],
                    'type_name' => $row['type_name'],
                    'term' => $row['term'],
                    'company_name' => $row['company_name'],
                    'send_name' => $row['send_name'],
                    'send_coordinator' => $row['send_coordinator'],
                    'send_position' => $row['send_position'],
                    'send_tel' => $row['send_tel'],
                    'send_email' => $row['send_email'],
                    'send_mobile' => $row['send_mobile'],
                    'type_position' => $row['type_position'],
                    'type_special' => $row['type_special'],
                    'need_student' => [
                    'date_addtraining' => $row['date_addtraining'],
                    'date_endtraining' => $row['date_endtraining']
                    ]
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