<body>
<?php include('nav.php');?>
    
    <?php
        @session_start();
        if(isset($_SESSION['msg'])){
            echo $_SESSION['msg'];
            unset($_SESSION['msg']);    
        }
    ?>
    <div class ="container-cadastro">


        <div class="info-cadastro">
            <img src="assets/taporra.jpg" alt="" srcset="">
            <h1>O primeiro passo para uma aventura.</h1>
                <p> o primeiro passo para desbloquear um mundo de oportunidades educacionais
                 e crescimento pessoal. Ao fazê-lo, você se torna parte de uma comunidade 
                dedicada ao conhecimento, onde o aprendizado é flexível, acessível
                e adaptado às suas necessidades.</p>


        </div>
            <div class="cadastro">
                <h3>Cadastre-se Gratuitamente</h3>
                <form action="cadastro.act.php" method="post" enctype="multipart/form-data">
                    <p>O nome de utilizador deve conter entre 1 e 20 caracteres; contendo apenas
                     letras de A a Z, números de 0 a 9, hifens ou traços sublinhados, não podendo
                      ser incluso quaisquer termos inapropriados.</p>

                      
                    <p><input type="text" name="nome" id="" placeholder="Nome Completo"></p>

                    <p><input type="text" name="apelido" id="" placeholder="Apelido"></p>
                
                    <p><input type="text" name="email" id="" placeholder="Email"></p>
                
                    <p><input type="text" name="tel" id="" placeholder="Telefone"></p>
                
                    <p><input type="date" name="nasc" id="" ></p>
                
                    <div class="foto">
                        <p>Foto: </p>
                        <p id="idfoto"><label for="foto">Escolher Foto</label></p>
                    </div>

                    <p>Ao clicar no botão abaixo, indicará que leu e concorda com os 
                    <a href="http://">Termos de Serviço</a> e <a href="http://">Termos de Privacidade</a>.</p>
                
                    <p><input type="file" name="foto" id="foto"></p>
                    <p id="botao"><input type="submit" value="Enviar"></p>
                </form>
            </div>
        


    </div>
    <script src="index.js"></script>
</body>
</html>