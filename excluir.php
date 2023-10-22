<?php
        $cod = $_GET['cod'];

        include('connect.php');


        if(mysqli_query($con, "Delete from `tb_clientes` where `cod` = '$cod'")){
            echo "Excluido com sucesso!";
        }else{
            echo "Erro ao excluir";
            echo $con->error;
        }
