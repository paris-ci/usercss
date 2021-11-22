// ==UserScript==
// @name         Scorm AUTOVALIDATOR
// @namespace    https://github.com/paris-ci/
// @version      1.0
// @description  Valide automatiquement certaines activitées sur edinumen
// @author       paris-ci
// @match        https://eleteca.edinumen.es/mod/*
// @icon         https://www.google.com/s2/favicons?domain=edinumen.es
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('Scorm AUTOVALIDATOR loading...', window);
    window.addEventListener('load', function () {
        console.log('Scorm AUTOVALIDATOR loaded');

        function isScorm() {
            if (window.location.href.indexOf("/mod/scorm/") >= 0) {
                console.log('I use scorm btw');
                return true;
            } else {
                console.log('THIS IS NOT SCORM, ABORT! ABORT!');
                console.log('This is Patrick', window.location.href);
                return false;
            }
        }

        function goNextPage() {
            console.log("Page suivante...");
            alert('Activitée autovalidée, page suivante...');
            $('a:contains("Actividad siguiente")')[0].click();
        }

        if (isScorm()) {
            console.log(window.scorm_current_node.title);
            var titleParams = new URLSearchParams(window.scorm_current_node.title);

            var dataPosted = new URLSearchParams();
            dataPosted.append("id", "");
            dataPosted.append("a", titleParams.get('a'), );
            dataPosted.append("sesskey", window.M.cfg.sesskey);
            dataPosted.append("attempt", 1);
            dataPosted.append("scoid", titleParams.get('scoid'));
            dataPosted.append("cmi__core__score__raw", 100);
            dataPosted.append("cmi__core__lesson_status", "passed");

            console.log("Validation en cours...");

            DoRequest(NewHttpReq(), "https://eleteca.edinumen.es/mod/scorm/datamodel.php", dataPosted.toString());

            console.log("Validé...");

            goNextPage();
        } else {
            // alert('Erreur: Autovalidation impossible')
            console.log("Autovalidation impossible...");
        }
    })
})();
