<?php 
    include 'libraries/config.php';
    include 'libraries/read.php'; 
    include 'libraries/write.php'; 
    include 'libraries/functions.php'; 
    include 'template/header.php';
?>

<body>
    
    <?php
    include 'template/pagelets/menu-variables.php'; 
    ?>
    
    <main class="cover_letter_container">
        <input id="cl_tags" type="text" hidden>
        <article id="cover_letter">
            <?php include 'template/pagelets/cover_letters/template_1/template_1.php' ?>
        </article>
    </main>

    <?php include 'template/pagelets/menu-blocks.php' ?>

<?php include 'template/footer.php'; ?>
