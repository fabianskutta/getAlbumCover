<?php

if ($_GET['url'] && $_GET['name']) {

    $url = $_GET['url'];
    $name = $_GET['name'];

    header("Content-disposition: attachment; filename={$name}" . ".jpg");
    header("Content-type: application/jpg:");
    readfile("https://i.scdn.co/image/".$url);
}
