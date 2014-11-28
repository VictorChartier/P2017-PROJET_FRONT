<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Des Paroles et des Actes</title>
    <link rel="stylesheet" type="text/css" href="src/css/reset.css">
    <link rel="stylesheet" type="text/css" href="src/css/style.css">
     <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700' rel='stylesheet' type='text/css'>
</head>
<body>
    <div class="backButton" id="backButton">
        <img src="../src/img/fleche_back.png"/>
    </div>
    <div class="allContainer">
        <div class="pageMF divPage offScreen" id="pageMF" style="display:none;">
            <div class="pageMFHeader">
                <div class="cachePhoto">
                    
                </div>
            </div>
            <div class="pageMFTitre">
                <p>Les moments forts</p>
            </div>
            <div class="pageMFContent" id="pageMFContent">
            <!--
                <div class="unMoment">
                    <span class="pageMFRank">25'31</span><span class="pageMFImg" style="background:url('src/img/melenchon.png'); background-size:cover; background-position:50% 50%;"></span><span class="pageMFName">Jean Luc Mélenchon</span>
                    <p class="pageMFTxt">"<span>Je pose mes couilles sur ton front, Marine. Ca te fera un dindon tiens.</span>"</p>
                </div>
            -->
            </div>
        </div>
        <div class="pagePersos divPage offScreen" id="pagePersos" style="display:none;">
            <div class="pagePersosHeader">
                <div class="cachePhoto">
                    
                </div>
            </div>
            <div class="pagePersosTitre">
                <p>Les personnalités</p>
            </div>
            <div class="pagePersosContent" id="pagePersosContent">
            <!--
                <div class="unPerso">
                    <span class="pagePersosRank">1</span><span class="pagePersosImg" style="background:url('src/img/melenchon.png'); background-size:cover; background-position:50% 50%;"></span><span class="pagePersosName">Jean Luc Mélenchon</span>
                    <div class="pagePersosContainerBar">
                        <div class="pagePersosBar" style="width:70%"></div>
                    </div>
                    <p class="pagePersosTxt">70% de vérité</p>
                </div>
            -->
            </div>
        </div>
        <div class="homeScreen divPage onScreen" id="homeScreen">
            <div class="containerLogo"><img src="src/img/logo_ftv.png"/></div>
            <div class="containerName">Le Décodeur
            <p>Insérez le code de votre session :</p>
            <form onSubmit="return false;">
                <div><input type="text" value="" name="code" id="code"></div>
                <div><input type="submit" value="OK" id="buttonCode"></div>
            </form>
            </div>
            <div class="containerVersion">version 0.3</div>
        </div>
        <div class="selectScreen divPage offScreen" id="selectScreen" style="display:none;">
            <div class="containerSelectMF">
                <div class="selectMF" id="selectMF">
                    <span class="titreMF">LES&nbsp;MOMENTS&nbsp;FORTS</span>
                </div>
            </div>
            <div class="containerSelectPerso">
                <div class="selectPerso" id="selectPerso">
                    <span class="titrePerso">LES&nbsp;PERSONNALITÉS</span>
                </div>
            </div>
        </div>
        <div class="choice divPage offScreen" id="choice" style="display:none;">
            <div class="photo" style="background:url('src/img/quote.jpg'); background-size:cover; background-position:50% 50%;">
                <div class="cachePhoto">
                    <div class="infosQuote">
                        <p class="time"><span class="bold" id="voteMin">--</span>'<span id="voteSec">--</span></p>
                        <p class="quote">&laquo;&nbsp;<span id="voteQuote">???</span>&nbsp;&raquo;</p>
                        <p class="name" id="voteName">???</p>
                    </div>
                </div>
            </div>
            <div class="all">
                <div class="content">
                    <p>Qu'en pensez-vous ?</p>
                    <div class="button_true" id="buttonTrue">J'y crois</div>
                    <div class="button_false" id="buttonFalse">J'y crois pas</div>
                </div>
            </div>
        </div>
        <div class="afterChoice divPage offScreen" id="afterChoice" style="display:none;">
            <div class="photo" style="background:url('src/img/melenchon.png'); background-size:cover; background-position:50% 50%;">
                <div class="cachePhoto">
                    <div class="infosQuote">
                        <p class="time"><span class="bold" id="resMin">--</span>'<span id="resSec">--</span></p>
                        <p class="quote">&laquo;&nbsp;<span id="resQuote">???</span>&nbsp;&raquo;</p>
                        <p class="name" id="resName">???</p>
                    </div>
                </div>
            </div>
            <div class="afterReponse">
                <p class="vrai" id="vrai">VRAI</p>
                <p class="faux" id="faux">FAUX</p>
            </div>
            <div class="afterStats">
                <div class="res">
                    <p class="percentagevraifaux"><span id="percentagevraifaux">75</span>%</p> des votants ont eu <p class="vraifaux">JUSTE</p>
                </div>
            </div>
        </div>
    </div>




    <script src="../src/js/jquery.js"></script>
    <script src="src/js/script.js"></script>
</body>
</html>