<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "../db.php";

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] !== "PATCH") {
     echo json_encode(array("status" => "error"));
     die();
}

try {
     $stmt = $dbh->prepare("UPDATE users SET l_name = ?, f_name = ?, username = ?, password = ?, avatar = ? WHERE id = ?");

     $stmt->bindParam(1, $data->f_name);
     $stmt->bindParam(2, $data->l_name);
     $stmt->bindParam(3, $data->username);
     $stmt->bindParam(4, $data->password);
     $stmt->bindParam(5, $data->avatar);
     $stmt->bindParam(6, $data->id);

     if ($stmt->execute()) {
          echo json_encode(array("status" => "success"));
     } else {
          echo json_encode(array("status" => "error"));
     }

     $dbh = null;
} catch (PDOException $e) {
     echo json_encode(['error' => $e->getMessage()]);
     die();
}
