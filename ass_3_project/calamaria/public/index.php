<!DOCTYPE html>
<html lang="sv">
<?php include("../private/router.php") ?> <!-- nothing sensitive but might as well stay out of root when possible -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo $page->description ?>">
    <meta name="author" content="Dennis Hägg">
    <meta property="og:title" content="<?php echo $page->getTitle(); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.calamariaofborneo.com/" />
    <meta property="og:image" content="https://www.calamariaofborneo.com/images/og/main.jpg" />
    <meta property="og:description" content="<?php echo $page->description ?>" />
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title><?php echo $page->getTitle(); ?></title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato&family=Merriweather:wght@300;700&display=swap">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
    <?php include("static/icons.html") ?>
    <header id="header">
        <div class="headerContainer">
            <a href="/" class="logoLink"><img src="images/logo.svg" alt="Logo" class="logo"></a>
            <nav id="topMenu">
                <?php include("static/menu.html") ?>
            </nav>
        </div>
    </header>

    <main id="main">
        <!-- fallback to php for seo -->
        <noscript>
            <?php $page->getContent() ?>
        </noscript>
        <!-- otherwise main content is loaded with js for nicer transitions -->
    </main>
    
    <footer id="footer">
        <div class="footerContainer">
            <section class="contact">
                <h2>Contact</h2>
                <i>Calamaria</i> of Borneo
                <br>
                c/o Dennis Hägg
                <br>
                Street address 12
                <br>
                123 45 City
            </section>
            <section class="social">
                <h2>Social</h2>
                <ul class="social">
                    <li><a href="https://www.facebook.com/" class="external" target="_blank">Facebook</a></li>
                    <li><a href="https://www.discord.com/" class="external" target="_blank">Discord</a></li>
                </ul>
            </section>
        </div>
    </footer>

    <div id="burgerIcon">
        <svg class="icon icon-cross hide"><use xlink:href="#icon-cross"></use></svg>
        <svg class="icon icon-menu"><use xlink:href="#icon-menu"></use></svg>
    </div>

    <nav id="burgerMenu">
        <?php include("static/menu.html") ?>
    </nav>

<script src="/js/main.js"></script>
</body>
</html>