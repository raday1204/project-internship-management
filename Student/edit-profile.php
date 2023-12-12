<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if (isset($_POST["username"])) {

    $username = $_POST["username"];


    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname = "internship_management";

    $conn = new mysqli($host, $user, $pass, $dbname);

    if ($conn->connect_error) {
        die(json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error)));
    }

    $type_code = $_POST['type_code'];
    $student_name = $_POST['student_name'];
    $student_lastname = $_POST['student_lastname'];
    $student_nickname = $_POST['student_nickname'];
    $student_citizen = $_POST['student_citizen'];
    $student_email = $_POST['student_email'];
    $student_mobile = $_POST['student_mobile']; 
    $student_facebook = $_POST['student_facebook'];
    $student_line = $_POST['student_line'];

    $st_address = $_POST['st_address'];
    $st_tambol = $_POST['st_tambol'];
    $st_ampher = $_POST['st_ampher'];
    $st_province = $_POST['st_province'];
    $st_zipcode = $_POST['st_zipcode'];
    $st_tel = $_POST['st_tel'];
    $st_contact = $_POST['st_contact'];
    $st_mobile = $_POST['st_mobile'];

    $ct_address = $_POST['ct_address'];
    $ct_tambol = $_POST['ct_tambol'];
    $ct_ampher = $_POST['ct_ampher'];
    $ct_province = $_POST['ct_province'];
    $ct_zipcode= $_POST['ct_zipcode'];
    $ct_tel = $_POST['ct_tel'];

    $updateSql = "UPDATE student SET
    type_code = '$type_code',
    student_name = '$student_name',
    student_lastname = '$student_lastname',
    student_nickname = '$student_nickname',
    student_citizen = '$student_citizen',
    student_email = '$student_email',
    student_mobile = '$student_mobile',
    student_facebook = '$student_facebook',
    student_line = '$student_line',

    st_address = '$st_address',
    st_tambol = '$st_tambol',
    st_ampher = '$st_ampher',
    st_province = '$st_province',
    st_zipcode = '$st_zipcode',
    st_tel = '$st_tel',
    st_contact = '$st_contact',
    st_mobile = '$st_mobile',

    ct_address = '$ct_address',
    ct_tambol = '$ct_tambol',
    ct_ampher = '$ct_ampher',
    ct_province = '$ct_province',
    ct_zipcode = '$ct_zipcode',
    ct_tel = '$ct_tel'
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