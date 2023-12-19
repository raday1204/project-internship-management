<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

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

    // Get data from the POST request
    $student_code = $_POST['student_code'];
    $student_name = $_POST['student_name'];
    $student_lastname = $_POST['student_lastname'];
    $depart_code = $_POST['depart_code'];
    $student_pak = $_POST['student_pak'];
    $student_mobile = $_POST['student_mobile']; 
    $student_facebook = $_POST['student_facebook'];

    // Update student profile data
    $updateSql = "UPDATE student SET
                student_code = '$student_code',
                student_name = '$student_name',
                student_lastname = '$student_lastname',
                depart_code = '$depart_code',
                student_pak = '$student_pak',
                student_mobile = '$student_mobile',
                student_facebook = '$student_facebook'
                WHERE student_code = '$username'";

    if ($conn->query($updateSql) === TRUE) {
        $response = array('success' => true, 'message' => 'Student profile updated successfully');
        // Fetch the updated data and send it back if needed
        $selectSql = "SELECT users.username, student.* 
            FROM users 
            LEFT JOIN student ON users.username = student.student_code 
            WHERE student.student_code = '$username'";

        $result = $conn->query($selectSql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $response['data'] = $row;
        } else {
            $response['success'] = false;
            $response['message'] = 'Error fetching updated student profile data';
        }
    } else {
        $response = array('success' => false, 'message' => 'Error updating student profile: ' . $conn->error);
    }

    // Close the database connection
    $conn->close();

    // Send JSON response back to the Angular application
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo json_encode(['error' => 'Username not provided']);
}
?>
