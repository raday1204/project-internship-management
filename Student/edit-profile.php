<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Method: POST");

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata, true);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "internship_management";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $studentID = $request['student_id'];

    $type_code = mysqli_real_escape_string($conn, $request['type_code']);
    $student_citizen = mysqli_real_escape_string($conn, $request['student_citizen']);
    $student_nickname = mysqli_real_escape_string($conn, $request['student_nickname']);
    $student_mobile = mysqli_real_escape_string($conn, $request['student_mobile']);
    $student_email = mysqli_real_escape_string($conn, $request['student_email']);
    $student_facebook = mysqli_real_escape_string($conn, $request['student_facebook']);
    $student_line = mysqli_real_escape_string($conn, $request['student_line']);

    $sql = "UPDATE students SET 
type_code = '$type_code',
student_citizen = '$student_citizen',
student_nickname = '$student_nickname',
student_mobile = '$student_mobile',
student_email = '$student_email',
student_facebook = '$student_facebook',
student_line = '$student_line'
WHERE student_id = $student_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode('Update successful');
    } else {
        echo json_encode('Update failed');
    }

    $conn->close();
}
?>