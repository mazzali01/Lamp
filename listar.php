<?php
    include('nav.php');
    ?>
<body>
    <?php
        include('connect.php');
        $clientes  = mysqli_query($con, "SELECT * FROM `tb_clientes`");
        echo "<div class=container-cards>";
            while($cliente = mysqli_fetch_array($clientes)){
                echo "<div class=card>";
                    echo "<div class=ftcliente>";
                        if($cliente['foto'] != ""){
                            echo "<img src=$cliente[foto]>";
                        }else{
                            echo "<img src=assets/ftcliente.png>";
                        }
                    echo "</div>";

                    echo "<div class=info-card>";

                        echo "<p>$cliente[cod]</p>";
                        echo "<p>$cliente[apelido]</p>";
                        echo "<p>$cliente[nome]</p>";
                        echo "<p>$cliente[email]</p>";
                        echo "<p>$cliente[nasc]</p>";

                        echo "<div class=botoes-card>";
                            echo "<a href=alterar.php?cod=$cliente[cod]><img src=assets/alterar.png alt=Alterar title=alterar></a>";
                            echo "<a href=javascript:excluir($cliente[cod])><img src=assets/excluir.png alt=excluir title=excluir></a>";
                        echo "</div>";

                    echo  "</div>";

                echo "</div>";
            }
        echo "</div>";
    ?>




<script src="app.js"></script>
    <script>
        function excluir(cod){
            opcao = confirm("Deseja excluir o registro " + cod + "?");
            console.log(opcao);
            if(opcao == true){
                $.ajax({
                    type: "get",
                    url: "excluir.php?cod="+cod,
                    success: function (response) {
                        location.reload();
                    }
                });
            }
        }
    </script>



</body>
</html>