<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    var_dump($_SESSION);
    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];

        
        $hostAuth = "localhost";
        $userAuth = "root";
        $passAuth = "";
        $dbname = "internship_management";

        $conn = new mysqli($hostAuth, $userAuth, $passAuth, $dbname);

        if ($conn->connect_error) {
            die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
        }

        $username = $conn->real_escape_string($username); // Additional escaping

        $sql = "SELECT users.username, student.* 
                FROM users 
                LEFT JOIN student ON users.username = student.student_code 
                WHERE student.student_code = '$username'";

        $result = $conn->query($sql);

        if ($result && $result->num_rows === 1) {
            $studentData = $result->fetch_assoc();

            if ($studentData['username'] === $studentData['student_code']) {
                echo json_encode($studentData);
            } else {
                echo json_encode(array("error" => "Username does not match student_code."));
            }
        } else {
            echo json_encode(array("error" => "No student data found for this user."));
        }

        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "User not logged in."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Use GET."));
}
?>
