<?php
    extract($_POST);
    require('connect.php');
    $busca = mysqli_query($con, "Select * from `tb_clientes` where `email` = '$email'");
    session_start();
    $msg = "";
    $destino = "";
    if($busca->num_rows == 1){
        //encontrou email
        $cliente = mysqli_fetch_array($busca);
        if($cliente['senha'] == md5($senha)){
            //senha correta
            $_SESSION['logado'] = true;
            $_SESSION['nome'] = $cliente['nome'];
            $destino = "location:listar.php";
        }else{
            //senha incorreta
            $msg = "Senha incorreta!";
            $destino = "location:login.php";
        }
    }else{
        //mais de um email ou nenhum
    }
    $_SESSION['msg'] = $msg;
    header($destino);

?>