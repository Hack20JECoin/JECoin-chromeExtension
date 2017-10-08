import EthereumQRplugin from 'ethereum-qr-code';

const qr = new EthereumQRplugin();

window.addEventListener('DOMContentLoaded', event => {

    injectBountyInfoIntoPage();
    createEthAddressElement();

    setupButtonEventListener();

    const url = window.location.href;
    const urlArray = url.split('/')
    const author = document.querySelector('.timeline-comment-header-text .author')


    const org = urlArray[3],
        repo = urlArray[4],
        PRNumber = urlArray[6],
        PRauthor = author.text;

    fetch(`https://0b27f0c0.ngrok.io/prbounty?org=${org}&repo=${repo}&prno=${PRNumber}&author=${PRauthor}`, {
        method: 'GET',
        headers: {
            "Accept-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        const bountyAmountElement = document.querySelector('.current-bounty');
        const span = document.createElement('span');

        // horrible shit
        span.innerText = `Current bounty amount:`
        const span2 = document.createElement('strong')
        span2.innerText = `${res.amount} JECoin`;
        const br = document.createElement('br')
        bountyAmountElement.appendChild(span);
        bountyAmountElement.appendChild(br);
        bountyAmountElement.appendChild(span2);


        qr.toCanvas({to: res.address, gas: 21000},
                    {size: 180, selector: '#bountyAddressQR'});

        const bountyAddressElement = document.querySelector('#bountyAddress');

        const addressText = document.createElement('strong')
        addressText.innerText = `Address: ${res.address}`
        bountyAddressElement.appendChild(addressText)
    });

});
function setupButtonEventListener() {
    const button = document.getElementById('JECoinButton');

    button.addEventListener('click', e => { unhideBountyAddress(); })
}

function unhideBountyAddress() {

    const hiddenClass = 'hidden'

    document.getElementById('bountyAddress')
    .classList
    .remove(hiddenClass);

    document.getElementById('JECoinButton')
    .classList
    .add(hiddenClass)
}


function createEthAddressElement() {
    const sidebarNode = document.querySelector('#bountySidebarElement')

    const divToInject =
    `<div id="bountyAddress" class="padded hidden">
        <span>Send JECoin to this address to add to the PR's bounty!</span>
        <div id="bountyAddressQR"></div>

    </div>
    `
    const ourDiv = document.createElement('div');

    ourDiv.innerHTML = divToInject;

    sidebarNode.appendChild(ourDiv);

}

function injectBountyInfoIntoPage() {
    const sidebarDiscussionNode = document.querySelector('div.discussion-sidebar-item.sidebar-labels.js-discussion-sidebar-item')
    const parentNode = sidebarDiscussionNode.parentNode;

    const bountyElement = createBountyElement();

    const bla = parentNode.insertBefore(bountyElement, sidebarDiscussionNode);

}

function createBountyElement() {

    const divToInject =
        `<div id="bountySidebarElement">
            <button type="button" class="discussion-sidebar-heading discussion-sidebar-toggle js-menu-target">
                Bounty
            </button>
            <div class="current-bounty padded--bottom">
            </div>
            <button id="JECoinButton" class="btn btn-sm" type="submit">
                Add JECoin to PR bounty
            </button>
        </div>`

    const ourDiv = document.createElement('div');
    ourDiv.classList.add("discussion-sidebar-item",
                         "sidebar-labels",
                         "js-discussion-sidebar-item"
                     );

    ourDiv.innerHTML = divToInject;

    return ourDiv;
}
