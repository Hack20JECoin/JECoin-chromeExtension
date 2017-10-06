
window.addEventListener('DOMContentLoaded', event => {

    injectBountyInfoIntoPage();

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

        span.innerText = `Current bounty amount: ${res.amount} JECoin`
        bountyAmountElement.appendChild(span);
    });

});


function injectBountyInfoIntoPage() {
    const sidebarDiscussionNode = document.querySelector('div.discussion-sidebar-item.sidebar-labels.js-discussion-sidebar-item')
    const parentNode = sidebarDiscussionNode.parentNode;

    const bountyElement = createBountyElement();

    const bla = parentNode.insertBefore(bountyElement, sidebarDiscussionNode);

}

function createBountyElement() {

    const divToInject =
        `<div>
            <button type="button" class="discussion-sidebar-heading discussion-sidebar-toggle js-menu-target">
                Bounty
            </button>
            <div class="current-bounty">
            </div>
            <button class="btn btn-sm" type="submit">
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
