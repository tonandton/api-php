<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "../db.php";
try {

     foreach ($dbh->query("SELECT * FROM users") as $row) {
          $users[] = [
               'id' => $row['id'],
               'l_name' => $row['l_name'],
               'f_name' => $row['f_name'],
               'username' => $row['username'],
               'password' => $row['password'],
               'avatar' => $row['avatar']
          ];
     }
     echo json_encode($users);

     header('Content-Type: application/json');
     $dbh = null;
} catch (PDOException $e) {
     echo json_encode(['error' => $e->getMessage()]);
     die();
}
