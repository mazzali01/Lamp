<?php
    extract($_POST);
    require('connect.php');
    $itens  = mysqli_query($con, "Select * from `tb_itens` where `nome` like '%$texto%'");
        echo "<div class=cards>";
            while($item = mysqli_fetch_array($itens)){
                echo "<div class=ftItem>";
                    echo "<div>";
                        if($item['foto'] != ""){
                            echo "<img src=$item[foto]>";
                        }else{
                            echo "<img src=img/ftItem.png>";
                        }
                    echo "</div>";

                    echo "<p>$item[cod]</p>";
                    echo "<p>$item[nome]</p>";
                    echo "<p>$item[tipo]</p>";
                    echo "<p>$item[preco]</p>";

                    echo "<div class=botoesCard>";
                        echo "<a href=alterar.php?cod=$item[cod]><img src=img/alterar.png alt=Alterar title=alterar></a>";
                        echo "<a href=javascript:excluir($item[cod])><img src=img/excluir.png alt=excluir title=excluir></a>";
                    echo "</div>";
                echo "</div>";
            }
        echo "</div>";