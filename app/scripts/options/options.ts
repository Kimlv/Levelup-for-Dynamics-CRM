/// <reference path="../types.ts" />
module LevelUp {
    function setVisibility(areaName: Types.AreaType){
        document.querySelectorAll('.forms').forEach((x: HTMLDivElement) => x.setAttribute("style", areaName !== Types.AreaType.Form ? 'display: none!important' : 'display: block'));
        document.querySelectorAll('.grid').forEach((x: HTMLDivElement) => x.setAttribute("style", areaName !== Types.AreaType.Grid ? 'display: none!important' : 'display: block'));
    }

    document.getElementById('crmHelperLinks').addEventListener('click',function(e){
        let targetElement = <HTMLElement>e.target;
        let category = (<HTMLElement>targetElement.parentNode).getAttribute('data-category');
        chrome.runtime.sendMessage(<Types.ExtensionMessage>{
            category: category,
            type: targetElement.id
        });
    }, false);

    window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('version').innerHTML = `v${chrome.runtime.getManifest().version}`;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            <Types.ExtensionMessage>{ 
                type: "VisibilityCheck"
            },
            setVisibility);
    });
    });
}